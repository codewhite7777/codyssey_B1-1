"""모의 응답 없이 실제 GitHub API/파일 로딩을 검사하고 화면을 캡처합니다."""
import argparse
import json
import os
from functools import partial
from http.server import ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright, expect
from browser_checks import QuietHandler

ROOT = Path(__file__).resolve().parents[1]

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--channel", default="chrome")
    parser.add_argument("--base-url", default="")
    parser.add_argument("--report", default="live.json")
    parser.add_argument("--screenshots", action="store_true")
    args = parser.parse_args()
    server = None
    if args.base_url:
        url = args.base_url
    else:
        server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(ROOT.parent)))
        Thread(target=server.serve_forever, daemon=True).start()
        url = f"http://127.0.0.1:{server.server_port}/{ROOT.name}/"
    report = {"mode": "original files over HTTP and real unauthenticated GitHub API", "base_url": url,
              "code_sha": os.environ.get("GITHUB_SHA", "working-copy"), "passed": False,
              "api_responses": [], "checks": [], "screenshots": [], "errors": []}
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(channel=args.channel, headless=True)
            report["browser"] = browser.version
            context = browser.new_context(viewport={"width": 1440, "height": 1000}, locale="ko-KR")
            page = context.new_page()
            page.on("pageerror", lambda error: report["errors"].append(str(error)))
            resources = []
            def on_response(response):
                if "/users/codewhite7777/repos" in response.url:
                    report["api_responses"].append({"url": response.url, "status": response.status})
                elif response.url.startswith(url):
                    resources.append({"url": response.url, "status": response.status})
            page.on("response", on_response)
            response = page.goto(url, wait_until="domcontentloaded", timeout=45000)
            assert response.status == 200, f"Page HTTP {response.status}"
            report["checks"].append("HTML served with HTTP 200")
            expect(page.locator("#projects-panel")).to_have_attribute("data-status", "success", timeout=20000)
            assert report["api_responses"] and report["api_responses"][0]["status"] == 200
            report["repository_names"] = page.locator(".project-card h3").all_text_contents()
            report["checks"].append("real GitHub API returned 200 and cards rendered")
            expect(page.locator("#contact-fields")).to_be_enabled()
            report["checks"].append("defer script loaded and initialized form")
            assert page.locator(".nav-layout").evaluate("el => getComputedStyle(el).display") == "flex"
            assert page.locator("#projects-grid").evaluate("el => getComputedStyle(el).display") == "grid"
            report["checks"].append("external CSS loaded: Flexbox and Grid applied")
            # 작은 관찰 대상들을 실제로 지나간 뒤 상단으로 돌아와 전체 페이지를 캡처합니다.
            for element in page.locator(".reveal").all():
                element.scroll_into_view_if_needed()
            page.wait_for_timeout(650)
            page.locator(".profile img").scroll_into_view_if_needed()
            page.wait_for_function("document.querySelector('.profile img').naturalWidth > 0")
            assert not [r for r in resources if r["status"] >= 400], resources
            report["checks"].append("relative asset paths and profile SVG loaded")
            page.evaluate("window.scrollTo({top:0,behavior:'instant'})")
            page.wait_for_timeout(200)
            shots = ROOT / "images/screenshots"
            if args.screenshots:
                shots.mkdir(parents=True, exist_ok=True)
                page.screenshot(path=str(shots / "desktop.png"), full_page=True)
                report["screenshots"].append("images/screenshots/desktop.png")
            page.locator("#theme-toggle").click()
            expect(page.locator("html")).to_have_attribute("data-theme", "dark")
            assert page.evaluate("localStorage.getItem('codyssey-b1-1-theme')") == "dark"
            page.wait_for_timeout(250)
            if args.screenshots:
                page.screenshot(path=str(shots / "dark.png"), full_page=True)
                report["screenshots"].append("images/screenshots/dark.png")
            page.reload(wait_until="domcontentloaded")
            expect(page.locator("html")).to_have_attribute("data-theme", "dark")
            expect(page.locator("#projects-panel")).to_have_attribute("data-status", "success", timeout=20000)
            report["checks"].append("native localStorage retained dark mode after reload")
            page.locator("#theme-toggle").click()
            page.set_viewport_size({"width": 390, "height": 844})
            expect(page.locator("#nav-menu")).to_be_hidden()
            page.locator("#menu-toggle").click()
            expect(page.locator("#nav-menu")).to_be_visible()
            page.locator("#menu-toggle").click()
            expect(page.locator("#nav-menu")).to_be_hidden()
            report["checks"].append("mobile menu open/close on real page")
            assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth")
            report["checks"].append("390px mobile has no horizontal overflow")
            for element in page.locator(".reveal").all():
                element.scroll_into_view_if_needed()
            page.wait_for_timeout(650)
            page.evaluate("window.scrollTo({top:0,behavior:'instant'})")
            page.wait_for_timeout(200)
            if args.screenshots:
                page.screenshot(path=str(shots / "mobile.png"), full_page=True)
                report["screenshots"].append("images/screenshots/mobile.png")
            page.locator(".submit-button").click()
            expect(page.locator("#name-error")).not_to_be_empty()
            page.locator("#contact-name").fill("검증 사용자")
            page.locator("#contact-email").fill("not-an-email")
            expect(page.locator("#email-error")).not_to_be_empty()
            page.locator("#contact-email").fill("test@example.com")
            page.locator("#contact-message").fill("실제 전송되지 않는 검증용 메시지입니다.")
            page.locator(".submit-button").click()
            expect(page.locator("#form-feedback")).to_contain_text("실제 메시지를 전송하지 않습니다")
            report["checks"].append("form required/email/success feedback on real page")
            assert not report["errors"], report["errors"]
            report["checks"].append("no uncaught JavaScript exceptions")
            report["resources"] = resources
            report["passed"] = True
            context.close()
            browser.close()
    except Exception as error:
        report["errors"].append(str(error))
    finally:
        if server:
            server.shutdown()
        (ROOT / "test-results").mkdir(exist_ok=True)
        (ROOT / "test-results" / args.report).write_text(json.dumps(report, ensure_ascii=False, indent=2))
        print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report["passed"] else 1

if __name__ == "__main__":
    raise SystemExit(main())
