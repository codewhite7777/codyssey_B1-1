"""실제 브라우저 이벤트로 앱을 검증합니다.
기본 모드: HTTP에서 원본 파일을 열고 GitHub 응답만 모의 처리합니다.
--inline: URL 접근 제한 환경에서 같은 HTML/CSS/JS를 메모리에 주입하는 보조 검사.
inline 결과는 파일 로딩 및 네이티브 localStorage 유지 검증을 대신하지 않습니다.
Playwright는 검증 전용이며 제출 웹사이트에서 사용하지 않습니다.
"""
import argparse
import base64
import json
import os
import re
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
FIXTURES = [{"name": f"검증용-프로젝트-{i + 1}", "description": "자동 검증용 모의 데이터입니다.",
             "html_url": f"https://github.com/codewhite7777/test-{i + 1}",
             "language": ["HTML", "JavaScript", None][i % 3], "stargazers_count": i,
             "updated_at": "2026-10-07T09:00:00Z"} for i in range(6)]
KEY = "codyssey-b1-1-theme"
API = "https://api.github.com/users/codewhite7777/repos**"

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--inline", action="store_true")
    parser.add_argument("--channel", default="")
    parser.add_argument("--executable", default="")
    parser.add_argument("--base-url", default="")
    args = parser.parse_args()
    results, errors, contexts = [], [], []
    server = None
    if not args.inline and not args.base_url:
        server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(ROOT.parent)))
        Thread(target=server.serve_forever, daemon=True).start()
        base_url = f"http://127.0.0.1:{server.server_port}/{ROOT.name}/"
    else:
        base_url = args.base_url

    def record(name, callback, skip=False):
        if skip:
            results.append({"name": name, "status": "skipped", "reason": "inline 모드는 네이티브 저장 및 파일 경로 검증이 아님"})
            print("SKIP", name, flush=True)
            return
        try:
            callback()
            results.append({"name": name, "status": "passed"})
            print("PASS", name, flush=True)
        except Exception as error:
            results.append({"name": name, "status": "failed", "error": str(error)[:1800]})
            print("FAIL", name, str(error)[:240], flush=True)
        finally:
            for context in contexts:
                context.close()
            contexts.clear()

    with sync_playwright() as pw:
        launch = {"headless": True}
        if args.channel:
            launch["channel"] = args.channel
        if args.executable:
            launch.update(executable_path=args.executable, args=["--no-sandbox"])
        browser = pw.chromium.launch(**launch)

        def new_page(data=FIXTURES, status=200, network_error=False, manual=False,
                     width=1280, storage=None, storage_blocked=False, malformed=False,
                     no_observer=False, reduced=True):
            context = browser.new_context(viewport={"width": width, "height": 900}, reduced_motion="reduce" if reduced else "no-preference")
            contexts.append(context)
            page = context.new_page()
            page.set_default_timeout(5000)
            page.on("pageerror", lambda e: errors.append(str(e)))
            setup = []
            if storage is not None:
                setup.append(f"localStorage.setItem({json.dumps(KEY)}, {json.dumps(storage)});")
            if storage_blocked:
                setup.append("Object.defineProperty(window, 'localStorage', {get() {throw new DOMException('Storage disabled', 'SecurityError');}});")
            if no_observer:
                setup.append("delete window.IntersectionObserver;")
            if args.inline:
                mock = {"status": status, "data": data, "networkError": network_error, "manual": manual, "malformed": malformed}
                setup.append(f"window.__testResponse = {json.dumps(mock)};")
                setup.append("""
                window.fetch = (_url, options) => new Promise((resolve, reject) => {
                  options.signal.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
                  const finish = () => {
                    const m = window.__testResponse;
                    if (m.networkError) {reject(new TypeError('Network error')); return;}
                    resolve({ok: m.status >= 200 && m.status < 300, status: m.status,
                      json: () => m.malformed ? Promise.reject(new SyntaxError('Invalid JSON')) : Promise.resolve(m.data)});
                  };
                  window.__resolveRequest = finish;
                  if (!window.__testResponse.manual) setTimeout(finish, 60);
                });
                """)
                html = (ROOT / "index.html").read_text()
                html = re.sub(r'<script\b[^>]*>[\s\S]*?</script>', '', html)
                html = re.sub(r'<link\b[^>]*>', '', html)
                avatar = base64.b64encode((ROOT / "images/profile.svg").read_bytes()).decode()
                html = html.replace('./images/profile.svg', f'data:image/svg+xml;base64,{avatar}')
                page.set_content(html)
                for script in setup:
                    page.evaluate("() => {" + script + "}")
                page.add_style_tag(content=(ROOT / "css/style.css").read_text())
                page.add_script_tag(content=(ROOT / "js/app.js").read_text())
            else:
                for script in setup:
                    page.add_init_script(script)
                if manual:
                    pending = []
                    page.route(API, lambda route: pending.append(route))
                    page._test_pending = pending
                else:
                    def route_handler(route):
                        if network_error:
                            route.abort("internetdisconnected")
                        elif malformed:
                            route.fulfill(status=status, content_type="application/json", body="{invalid")
                        else:
                            route.fulfill(status=status, content_type="application/json", body=json.dumps(data))
                    page.route(API, route_handler)
                response = page.goto(base_url, wait_until="domcontentloaded")
                assert response and response.status == 200, "HTML did not return 200"
            if not manual:
                expect(page.locator("#projects-panel")).not_to_have_attribute("data-status", "loading")
            return page

        def success():
            p = new_page()
            expect(p.locator("#projects-panel")).to_have_attribute("data-status", "success")
            expect(p.locator(".project-card")).to_have_count(6)
            expect(p.locator("#projects-retry")).to_be_hidden()
            expect(p.locator("#projects-spinner")).to_be_hidden()
            expect(p.locator("#projects-panel")).to_have_attribute("aria-busy", "false")
            expect(p.locator(".project-card").last).to_contain_text("언어 미지정")
            p.locator(".profile img").scroll_into_view_if_needed()
            p.wait_for_function("document.querySelector('.profile img').naturalWidth > 0")
        record("success cards, fallbacks and image", success)

        def loading():
            p = new_page(manual=True)
            expect(p.locator("#projects-panel")).to_have_attribute("data-status", "loading")
            expect(p.locator("#projects-spinner")).to_be_visible()
            expect(p.locator("#projects-message")).to_contain_text("불러오는 중")
            expect(p.locator("#projects-panel")).to_have_attribute("aria-busy", "true")
            if args.inline:
                p.evaluate("window.__testResponse.manual=false; window.__resolveRequest();")
            else:
                p.wait_for_timeout(100)
                assert p._test_pending
                p._test_pending.pop().fulfill(status=200, content_type="application/json", body=json.dumps(FIXTURES))
            expect(p.locator("#projects-panel")).to_have_attribute("data-status", "success")
        record("loading then success", loading)

        def empty():
            p = new_page(data=[])
            expect(p.locator("#projects-panel")).to_have_attribute("data-status", "empty")
            expect(p.locator("#projects-message")).to_have_text("표시할 프로젝트가 없습니다.")
            expect(p.locator(".project-card")).to_have_count(0)
        record("empty response", empty)

        for status in (403, 429, 404, 500):
            def http_error(status=status):
                p = new_page(status=status)
                expect(p.locator("#projects-panel")).to_have_attribute("data-status", "error")
                expect(p.locator("#projects-message")).to_contain_text("프로젝트를 불러올 수 없습니다")
                expect(p.locator("#projects-retry")).to_be_visible()
                if status in (403, 429):
                    expect(p.locator("#projects-message")).to_contain_text("제한")
            record(f"HTTP {status} error UI", http_error)

        def network():
            p = new_page(network_error=True)
            expect(p.locator("#projects-message")).to_contain_text("네트워크")
            expect(p.locator("#projects-retry")).to_be_visible()
        record("offline/network error", network)
        def bad_json():
            p = new_page(malformed=True)
            expect(p.locator("#projects-panel")).to_have_attribute("data-status", "error")
        record("malformed JSON", bad_json)
        def bad_data():
            p = new_page(data={"message": "not an array"})
            expect(p.locator("#projects-message")).to_contain_text("응답 형식")
        record("unexpected response shape", bad_data)

        def retry():
            p = new_page(status=500)
            if args.inline:
                p.evaluate(f"window.__testResponse.status=200; window.__testResponse.data={json.dumps(FIXTURES)};")
            else:
                p.unroute(API)
                p.route(API, lambda route: route.fulfill(status=200, content_type="application/json", body=json.dumps(FIXTURES)))
            p.locator("#projects-retry").click()
            expect(p.locator("#projects-panel")).to_have_attribute("data-status", "success")
            expect(p.locator(".project-card")).to_have_count(6)
        record("retry recovers from failure", retry)

        def safe_content():
            malicious = [{**FIXTURES[0], "name": '<img src=x onerror="window.__injected=true">',
                          "description": '<script>window.__injected=true</script>', "html_url": "javascript:alert(1)"}]
            p = new_page(data=malicious)
            expect(p.locator(".project-card img, .project-card script")).to_have_count(0)
            assert p.evaluate("window.__injected") is None
            expect(p.locator(".project-card a")).to_have_attribute("href", "https://github.com/codewhite7777")
            expect(p.locator(".project-description")).to_contain_text("<script>")
        record("external HTML escaped and unsafe URL rejected", safe_content)
        def timeout():
            p = new_page(manual=True)
            expect(p.locator("#projects-panel")).to_have_attribute("data-status", "error", timeout=13000)
            expect(p.locator("#projects-message")).to_contain_text("시간이 초과")
        record("10 second request timeout", timeout)

        def theme():
            p = new_page()
            expect(p.locator("html")).to_have_attribute("data-theme", "light")
            before = p.locator("body").evaluate("el => getComputedStyle(el).backgroundColor")
            p.locator("#theme-toggle").click()
            expect(p.locator("html")).to_have_attribute("data-theme", "dark")
            expect(p.locator("#theme-toggle")).to_have_attribute("aria-pressed", "true")
            assert before != p.locator("body").evaluate("el => getComputedStyle(el).backgroundColor")
            p.locator("#theme-toggle").click()
            expect(p.locator("html")).to_have_attribute("data-theme", "light")
        record("theme click updates state DOM CSS", theme)
        def persistence():
            p = new_page()
            p.locator("#theme-toggle").click()
            assert p.evaluate(f"localStorage.getItem('{KEY}')") == "dark"
            p.reload(wait_until="domcontentloaded")
            expect(p.locator("html")).to_have_attribute("data-theme", "dark")
        record("native localStorage persistence after reload", persistence, skip=args.inline)
        def invalid_theme():
            p = new_page(storage="not-a-theme")
            expect(p.locator("html")).to_have_attribute("data-theme", "light")
        record("invalid saved theme fallback", invalid_theme, skip=args.inline)
        def denied_storage():
            p = new_page(storage_blocked=True)
            p.locator("#theme-toggle").click()
            expect(p.locator("html")).to_have_attribute("data-theme", "dark")
            expect(p.locator("#theme-feedback")).to_contain_text("저장하지 못했습니다")
            expect(p.locator(".project-card")).to_have_count(6)
        record("storage failure does not break app", denied_storage)

        def menu():
            p = new_page(width=390)
            expect(p.locator("#nav-menu")).to_be_hidden()
            p.locator("#menu-toggle").click()
            expect(p.locator("#nav-menu")).to_be_visible()
            expect(p.locator("#nav-menu")).to_have_class("nav-menu active")
            expect(p.locator("#menu-toggle")).to_have_attribute("aria-expanded", "true")
            p.locator("#menu-toggle").click()
            expect(p.locator("#nav-menu")).to_be_hidden()
            p.locator("#menu-toggle").click()
            p.keyboard.press("Escape")
            expect(p.locator("#nav-menu")).to_be_hidden()
            expect(p.locator("#menu-toggle")).to_be_focused()
            p.locator("#menu-toggle").click()
            p.locator("#nav-menu a[href='#about']").click()
            expect(p.locator("#nav-menu")).to_be_hidden()
            assert p.locator("#about").bounding_box()["y"] >= 75
        record("mobile menu toggle Escape and anchor close", menu)
        def resize():
            p = new_page(width=390)
            p.locator("#menu-toggle").click()
            p.set_viewport_size({"width": 1024, "height": 900})
            expect(p.locator("#menu-toggle")).to_be_hidden()
            expect(p.locator("#nav-menu")).to_be_visible()
            p.set_viewport_size({"width": 390, "height": 900})
            expect(p.locator("#nav-menu")).to_be_hidden()
            expect(p.locator("#menu-toggle")).to_have_attribute("aria-expanded", "false")
        record("mobile desktop mobile menu state", resize)
        def scroll():
            p = new_page()
            expect(p.locator("#back-to-top")).to_be_hidden()
            p.evaluate("window.scrollTo(0,59)")
            p.wait_for_timeout(100)
            assert "scrolled" not in p.locator("#site-header").get_attribute("class")
            p.evaluate("window.scrollTo(0,60)")
            expect(p.locator("#site-header")).to_have_class("site-header scrolled")
            p.evaluate("window.scrollTo(0,299)")
            p.wait_for_timeout(100)
            expect(p.locator("#back-to-top")).to_be_hidden()
            p.evaluate("window.scrollTo(0,300)")
            expect(p.locator("#back-to-top")).to_be_visible()
            p.locator("#back-to-top").click()
            expect(p.locator("#back-to-top")).to_be_hidden()
            assert p.evaluate("window.scrollY") == 0
        record("60px 300px boundaries and back to top", scroll)
        def smooth():
            p = new_page(reduced=False)
            assert p.locator("html").evaluate("el => getComputedStyle(el).scrollBehavior") == "smooth"
            p.locator(".button-primary[href='#projects']").click()
            p.wait_for_timeout(1400)
            box = p.locator("#projects").bounding_box()
            assert 75 <= box["y"] < 125, box
        record("smooth anchor arrives below fixed header", smooth)

        for width in (320, 390, 767, 768, 1024, 1440):
            def responsive(width=width):
                p = new_page(width=width)
                assert p.evaluate("document.documentElement.scrollWidth <= window.innerWidth"), "horizontal overflow"
                if width < 768:
                    expect(p.locator("#menu-toggle")).to_be_visible()
                    expect(p.locator("#nav-menu")).to_be_hidden()
                else:
                    expect(p.locator("#menu-toggle")).to_be_hidden()
                    expect(p.locator("#nav-menu")).to_be_visible()
                grid = p.locator("#projects-grid").evaluate("el => getComputedStyle(el).gridTemplateColumns")
                available = p.locator("#projects-grid").bounding_box()["width"]
                gap = float(p.locator("#projects-grid").evaluate("el => parseFloat(getComputedStyle(el).columnGap)"))
                expected_columns = min(6, max(1, int((available + gap) / (288 + gap))))
                assert len(grid.split()) == expected_columns, grid
            record(f"responsive layout {width}px", responsive)

        def form():
            p = new_page()
            requests = []
            p.on("request", lambda req: requests.append(req.url))
            original = p.url
            p.locator(".submit-button").click()
            for name in ("name", "email", "message"):
                expect(p.locator(f"#{name}-error")).not_to_be_empty()
                expect(p.locator(f"#contact-{name}")).to_have_attribute("aria-invalid", "true")
            expect(p.locator("#contact-name")).to_be_focused()
            p.locator("#contact-name").fill("   ")
            expect(p.locator("#name-error")).not_to_be_empty()
            p.locator("#contact-name").fill("LINK")
            expect(p.locator("#name-error")).to_be_empty()
            p.locator("#contact-email").fill("invalid-email")
            expect(p.locator("#email-error")).to_contain_text("이메일 형식")
            p.locator("#contact-email").fill("link@example.com")
            expect(p.locator("#email-error")).to_be_empty()
            p.locator("#contact-message").fill("학습용 검증 메시지입니다.")
            p.locator(".submit-button").click()
            expect(p.locator("#form-feedback")).to_contain_text("입력 내용을 확인했습니다")
            expect(p.locator("#form-feedback")).to_contain_text("실제 메시지를 전송하지 않습니다")
            assert p.url == original
            assert not any("github" not in url and not url.endswith("profile.svg") for url in requests), requests
            p.locator("#contact-message").fill("")
            expect(p.locator("#message-error")).not_to_be_empty()
            expect(p.locator("#form-feedback")).to_be_empty()
        record("form required whitespace email correction success no transmission", form)
        def reveal():
            p = new_page(reduced=False)
            card = p.locator(".skill-card").first
            expect(card).to_have_class(re.compile("is-pending"))
            card.scroll_into_view_if_needed()
            expect(card).to_have_class(re.compile("is-visible"))
            p.wait_for_timeout(600)
            assert card.evaluate("el => getComputedStyle(el).opacity") == "1"
        record("Intersection Observer reveals element", reveal)
        def motion():
            p = new_page(reduced=True)
            expect(p.locator(".is-pending")).to_have_count(0)
            assert p.locator("html").evaluate("el => getComputedStyle(el).scrollBehavior") == "auto"
        record("reduced motion keeps content visible", motion)
        def no_observer():
            p = new_page(no_observer=True)
            expect(p.locator(".is-pending")).to_have_count(0)
            expect(p.locator(".project-card")).to_have_count(6)
        record("missing Intersection Observer fallback", no_observer)
        def keyboard():
            p = new_page(width=390)
            p.keyboard.press("Tab")
            expect(p.locator(".skip-link")).to_be_focused()
            p.keyboard.press("Enter")
            expect(p.locator("#main")).to_be_focused()
        record("keyboard skip link", keyboard)
        def console():
            assert not errors, errors
        record("no uncaught JavaScript exceptions", console)
        report = {"mode": "in-memory; not HTTP/native storage" if args.inline else "HTTP with mocked GitHub responses",
                  "browser": browser.version, "channel": args.channel or "chromium",
                  "code_sha": os.environ.get("GITHUB_SHA", "working-copy"), "results": results, "uncaught_errors": errors,
                  "passed": sum(r["status"] == "passed" for r in results),
                  "failed": sum(r["status"] == "failed" for r in results),
                  "skipped": sum(r["status"] == "skipped" for r in results)}
        (ROOT / "test-results").mkdir(exist_ok=True)
        output = ROOT / "test-results" / ("inline-browser.json" if args.inline else "browser.json")
        output.write_text(json.dumps(report, ensure_ascii=False, indent=2))
        print(json.dumps({k: report[k] for k in ["mode", "browser", "passed", "failed", "skipped"]}, ensure_ascii=False), flush=True)
        # 모의 데이터가 표시된 로컬 검토용 화면. 제출용 스크린샷과 구분합니다.
        if args.inline:
            preview = new_page(width=1440)
            preview.screenshot(path=str(ROOT / "test-results/preview-desktop.png"), full_page=True)
            preview.locator("#theme-toggle").click()
            preview.screenshot(path=str(ROOT / "test-results/preview-dark.png"), full_page=True)
            mobile = new_page(width=390)
            mobile.screenshot(path=str(ROOT / "test-results/preview-mobile.png"), full_page=True)
        for context in contexts:
            context.close()
        browser.close()
    if server:
        server.shutdown()
    return 1 if report["failed"] else 0

if __name__ == "__main__":
    raise SystemExit(main())
