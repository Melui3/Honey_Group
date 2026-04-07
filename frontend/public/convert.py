import os
from PIL import Image
from pathlib import Path

public_dir = Path(".")
extensions = {".jpg", ".jpeg", ".png", ".jfif"}

for img_path in public_dir.rglob("*"):
    if img_path.suffix.lower() in extensions and ".bak" not in img_path.name:
        webp_path = img_path.with_suffix(".webp")
        try:
            with Image.open(img_path) as img:
                img.save(webp_path, "WEBP", quality=85)
            print(f"✅ {img_path} → {webp_path}")
        except Exception as e:
            print(f"❌ {img_path} : {e}")