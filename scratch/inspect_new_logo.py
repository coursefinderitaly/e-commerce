import os
from PIL import Image

src_path = "/home/raag/.gemini/antigravity/brain/40e66e4b-a338-4f64-8e93-46d2633868af/media__1786601124036.png"

if os.path.exists(src_path):
    img = Image.open(src_path)
    print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
else:
    print("File not found:", src_path)
