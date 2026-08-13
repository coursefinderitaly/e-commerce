import os
from PIL import Image

src_path = "/home/raag/.gemini/antigravity/brain/40e66e4b-a338-4f64-8e93-46d2633868af/media__1786601124036.png"
public_dir = "/home/raag/Desktop/PROJECTS/ecommerce-deepseek/public"

if os.path.exists(src_path):
    img = Image.open(src_path)
    print(f"Loaded image: {img.size}, {img.mode}")
    
    # Save logo1.png
    png_path = os.path.join(public_dir, "logo1.png")
    img.save(png_path, format="PNG", optimize=True)
    print(f"Saved: {png_path}")

    # Save logo1_opt.png
    png_opt_path = os.path.join(public_dir, "logo1_opt.png")
    img.save(png_opt_path, format="PNG", optimize=True)
    print(f"Saved: {png_opt_path}")

    # Save logo1.webp
    webp_path = os.path.join(public_dir, "logo1.webp")
    img.save(webp_path, format="WEBP", quality=95)
    print(f"Saved: {webp_path}")

    # Save logo1_opt.webp
    webp_opt_path = os.path.join(public_dir, "logo1_opt.webp")
    img.save(webp_opt_path, format="WEBP", quality=95)
    print(f"Saved: {webp_opt_path}")

else:
    print("Source image not found!")
