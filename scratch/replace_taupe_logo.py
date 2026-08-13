import os
from PIL import Image

src_path = "/home/raag/.gemini/antigravity/brain/40e66e4b-a338-4f64-8e93-46d2633868af/media__1786604482585.jpg"
public_dir = "/home/raag/Desktop/PROJECTS/ecommerce-deepseek/public"

if os.path.exists(src_path):
    img = Image.open(src_path)
    print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
    
    # Save as PNG
    png_path = os.path.join(public_dir, "logo1.png")
    img.save(png_path, format="PNG", optimize=True)
    
    png_opt_path = os.path.join(public_dir, "logo1_opt.png")
    img.save(png_opt_path, format="PNG", optimize=True)
    
    # Save as WebP
    webp_path = os.path.join(public_dir, "logo1.webp")
    img.save(webp_path, format="WEBP", quality=95)
    
    webp_opt_path = os.path.join(public_dir, "logo1_opt.webp")
    img.save(webp_opt_path, format="WEBP", quality=95)
    
    print("Successfully replaced all logo files!")
else:
    print("Source image file not found:", src_path)
