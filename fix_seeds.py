import os
from pathlib import Path

extensions = [".jpg", ".jpeg", ".png", ".jfif", ".JPG", ".JPEG", ".PNG", ".JFIF"]
seed_dir = Path("backend/content/management/commands")

for file in seed_dir.rglob("seed_*.py"):
    content = file.read_text(encoding="utf-8")
    modified = content
    for ext in extensions:
        modified = modified.replace(ext, ".webp")
    if modified != content:
        file.write_text(modified, encoding="utf-8")
        print(f"✅ {file}")