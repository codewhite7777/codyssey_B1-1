"""제출 앱의 파일 구조와 필수 구문 검사. Python 표준 라이브러리만 사용합니다."""
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.elements = []
    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))

def main():
    html = (ROOT / "index.html").read_text()
    css = (ROOT / "css/style.css").read_text()
    js = (ROOT / "js/app.js").read_text()
    document = Document()
    document.feed(html)
    nodes = document.elements
    ids = [a["id"] for _, a in nodes if "id" in a]
    tags = [tag for tag, _ in nodes]
    tests = []
    def check(name, condition):
        tests.append({"name": name, "passed": bool(condition)})
        print(f'{"PASS" if condition else "FAIL"} {name}')
    check("required files", all((ROOT / p).exists() for p in ["index.html", "css/style.css", "js/app.js", "images/profile.svg"]))
    check("Korean document", any(t == "html" and a.get("lang") == "ko" for t, a in nodes))
    check("viewport", any(t == "meta" and a.get("name") == "viewport" for t, a in nodes))
    check("semantic structure", all(t in tags for t in ["header", "nav", "main", "section", "footer"]) and "<article" in js)
    check("all content regions", all(i in ids for i in ["hero", "about", "skills", "projects", "contact", "footer"]))
    check("single h1", tags.count("h1") == 1)
    check("unique ids", len(ids) == len(set(ids)))
    check("valid anchor targets", all(a["href"][1:] in ids for t, a in nodes if t == "a" and a.get("href", "").startswith("#")))
    check("meaningful image alt", all(a.get("alt", "").strip() for t, a in nodes if t == "img"))
    check("local image exists", all((ROOT / a["src"]).is_file() for t, a in nodes if t == "img"))
    check("external CSS", any(t == "link" and a.get("href") == "./css/style.css" for t, a in nodes))
    check("external deferred JS", any(t == "script" and a.get("src") == "./js/app.js" and "defer" in a for t, a in nodes))
    check("no inline style/events/scripts", all("style" not in a and not any(k.startswith("on") for k in a) for _, a in nodes) and all(not body.strip() for body in re.findall(r"<script[^>]*>([\s\S]*?)</script>", html)))
    labels = [a.get("for") for t, a in nodes if t == "label"]
    check("form labels and required inputs", all(a.get("id") in labels and "required" in a for t, a in nodes if t in ["input", "textarea"]))
    check("email type", any(t == "input" and a.get("type") == "email" for t, a in nodes))
    check("no runtime dependencies", all(not a.get("src", "").startswith("http") for t, a in nodes if t == "script") and "@import" not in css)
    check("CSS variables and dark theme", all(s in css for s in [":root", '[data-theme="dark"]', "--font-body", "--space-4", "--color-background"]))
    check("Flexbox and Grid", all(s in css for s in ["display: flex", "display: grid", "auto-fit", "minmax"]))
    check("mobile-first breakpoints", all(s in css for s in ["min-width: 768px", "min-width: 1024px"]))
    check("hover transition shadow", all(s in css for s in [":hover", "transition:", "box-shadow:"]))
    check("no var", re.search(r"\bvar\s+\w+", js) is None)
    check("DOM selection and content", all(s in js for s in ["querySelector(", "querySelectorAll(", ".textContent", ".innerHTML"]))
    check("classList methods", all(s in js for s in ["classList.add(", "classList.remove(", "classList.toggle("]))
    check("active menu toggle", 'classList.toggle("active", STATE.menuOpen)' in js)
    check("all required events", all(f'addEventListener("{s}"' in js for s in ["click", "submit", "scroll", "input"]))
    check("preventDefault", "event.preventDefault()" in js)
    check("ES6 and array methods", all(s in js for s in ["=>", "${", ".map(", ".forEach(", "const {"]))
    check("state and localStorage", all(s in js for s in ["const STATE", "localStorage.getItem", "localStorage.setItem"]))
    check("fetch async await catch", all(s in js for s in ["async ()", "await fetch", "await response.json()", "catch (error)", "!response.ok"]))
    check("API statuses and rate limit", all(s in js for s in ['"loading"', '"success"', '"error"', '"empty"', "response.status === 403"]))
    check("Intersection Observer", "new IntersectionObserver" in js and "revealThreshold: 0.2" in js)
    check("safe external content", "escapeHTML" in js and "safeRepositoryUrl" in js)
    check("reduced motion", "prefers-reduced-motion" in css and "prefers-reduced-motion" in js)
    syntax = subprocess.run(["node", "--check", str(ROOT / "js/app.js")], capture_output=True, text=True)
    check("JavaScript syntax", syntax.returncode == 0)
    (ROOT / "test-results").mkdir(exist_ok=True)
    (ROOT / "test-results/static.json").write_text(json.dumps(tests, ensure_ascii=False, indent=2))
    print(f'{sum(t["passed"] for t in tests)}/{len(tests)} static checks passed')
    return 0 if all(t["passed"] for t in tests) else 1

if __name__ == "__main__":
    raise SystemExit(main())
