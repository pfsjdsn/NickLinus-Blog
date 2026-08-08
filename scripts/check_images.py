import os
import re
import glob

POSTS_DIR = r'C:\Users\admin\Desktop\NickLinus Blog\content\posts'
IMAGES_DIR = r'C:\Users\admin\Desktop\NickLinus Blog\public\images'

def check_images():
    # Find all image references in mdx files
    image_refs = {}  # filepath -> list of (alt_text, image_path)
    missing = []
    
    for filepath in glob.glob(os.path.join(POSTS_DIR, '*.mdx')):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find markdown image references: ![alt](path)
        for match in re.finditer(r'!\[([^\]]*)\]\(([^)]+)\)', content):
            alt_text = match.group(1)
            img_path = match.group(2)
            
            # Only check absolute paths starting with /images/
            if img_path.startswith('/images/'):
                filename = os.path.basename(img_path)
                full_path = os.path.join(IMAGES_DIR, filename)
                
                if not os.path.exists(full_path):
                    missing.append((os.path.basename(filepath), alt_text, img_path, full_path))
                else:
                    if filepath not in image_refs:
                        image_refs[filepath] = []
                    image_refs[filepath].append((alt_text, img_path))
    
    print(f"Found {len(image_refs)} files with image references\n")
    
    if missing:
        print(f"MISSING IMAGES ({len(missing)}):\n")
        for fname, alt, path, full in missing:
            print(f"  {fname}: [{alt}] -> {path} (NOT FOUND: {full})")
    else:
        print("All referenced images exist!\n")
    
    # Check for placeholder alt text
    print("\nPlaceholder alt text check:\n")
    for filepath, refs in image_refs.items():
        for alt, path in refs:
            if alt in ['在这里插入图片描述', '']:
                print(f"  {os.path.basename(filepath)}: [{alt}] -> {path}")

if __name__ == '__main__':
    check_images()
