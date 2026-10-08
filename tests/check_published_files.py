"""공개된 런타임 파일이 검사 중인 소스와 같은 바이트인지 확인합니다."""
import hashlib
import json
import os
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
FILES = ("index.html", "css/style.css", "js/app.js", "images/profile.svg")

def main():
    base_url = os.environ.get("SITE_URL", "https://codewhite7777.github.io/codyssey_B1-1/")
    report = {"base_url": base_url, "source_sha": os.environ.get("GITHUB_SHA", "working-copy"),
              "files": [], "passed": True}
    for name in FILES:
        expected = hashlib.sha256((ROOT / name).read_bytes()).hexdigest()
        row = {"path": name, "expected_sha256": expected, "passed": False}
        try:
            request = Request(urljoin(base_url, name), headers={"Cache-Control": "no-cache", "User-Agent": "B1-1-verification"})
            with urlopen(request, timeout=30) as response:
                row["http_status"] = response.status
                row["published_sha256"] = hashlib.sha256(response.read()).hexdigest()
            row["passed"] = row["http_status"] == 200 and row["published_sha256"] == expected
        except Exception as error:
            row["error"] = str(error)
        report["files"].append(row)
        report["passed"] = report["passed"] and row["passed"]
    (ROOT / "test-results").mkdir(exist_ok=True)
    text = json.dumps(report, ensure_ascii=False, indent=2)
    (ROOT / "test-results/published-files.json").write_text(text)
    print(text)
    return 0 if report["passed"] else 1

if __name__ == "__main__":
    raise SystemExit(main())
