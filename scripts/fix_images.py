import os
import re

POSTS_DIR = r'C:\Users\admin\Desktop\NickLinus Blog\content\posts'

# Mapping of (filename, image_path) -> new_alt_text
ALT_MAP = {
    # miniprogram-api-config.mdx
    ('miniprogram-api-config.mdx', '/images/115_1.png'): 'API接口配置文件夹结构',
    
    # miniprogram-auto-format.mdx
    ('miniprogram-auto-format.mdx', '/images/127_1.png'): '开发者工具设置编辑器入口',
    ('miniprogram-auto-format.mdx', '/images/127_2.png'): '更多工作区编辑器设置',
    ('miniprogram-auto-format.mdx', '/images/127_3.png'): 'setting.json文件图标',
    ('miniprogram-auto-format.mdx', '/images/127_4.png'): '自动格式化配置效果',
    
    # miniprogram-cloud-dev-errors.mdx
    ('miniprogram-cloud-dev-errors.mdx', '/images/040_1.png'): '云开发数据库报错信息',
    ('miniprogram-cloud-dev-errors.mdx', '/images/040_2.png'): '云开发集合名称错误修正',
    
    # miniprogram-custom-select.mdx
    ('miniprogram-custom-select.mdx', '/images/098_1.gif'): '自定义下拉选择器效果',
    
    # miniprogram-devtools-git.mdx
    ('miniprogram-devtools-git.mdx', '/images/103_1.png'): '开发者工具设置编辑器',
    ('miniprogram-devtools-git.mdx', '/images/103_2.png'): '更多工作区编辑器设置',
    ('miniprogram-devtools-git.mdx', '/images/103_3.png'): '终端功能设置',
    ('miniprogram-devtools-git.mdx', '/images/103_4.png'): 'Git Bash终端配置效果',
    
    # miniprogram-list-multiselect.mdx
    ('miniprogram-list-multiselect.mdx', '/images/056_1.gif'): '列表多选限制3项效果',
    
    # miniprogram-phone-call-component.mdx
    ('miniprogram-phone-call-component.mdx', '/images/037_1.png'): '拨打电话组件效果',
    
    # miniprogram-swiper-custom-indicator.mdx
    ('miniprogram-swiper-custom-indicator.mdx', '/images/031_1.png'): '轮播图指示器样式一效果',
    ('miniprogram-swiper-custom-indicator.mdx', '/images/031_2.png'): '轮播图指示器样式二效果',
    ('miniprogram-swiper-custom-indicator.mdx', '/images/031_3.png'): '轮播图指示器样式三效果',
    ('miniprogram-swiper-custom-indicator.mdx', '/images/031_4.png'): '轮播图指示器样式四效果',
    ('miniprogram-swiper-custom-indicator.mdx', '/images/031_5.png'): '轮播图指示器样式五效果',
    
    # uniapp-hbuilderx-publish.mdx
    ('uniapp-hbuilderx-publish.mdx', '/images/085_1.png'): 'HBuilderX发行菜单',
    ('uniapp-hbuilderx-publish.mdx', '/images/085_2.png'): 'HBuilderX发行网站选项',
    ('uniapp-hbuilderx-publish.mdx', '/images/085_3.png'): 'HBuilderX发行配置',
    ('uniapp-hbuilderx-publish.mdx', '/images/085_4.png'): 'HBuilderX发行进度',
    ('uniapp-hbuilderx-publish.mdx', '/images/085_5.png'): 'HBuilderX发行结果',
    ('uniapp-hbuilderx-publish.mdx', '/images/085_6.png'): 'HBuilderX发行完成',
}

def fix_alt_text(filepath, filename):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Replace placeholder alt texts
    for (fname, img_path), new_alt in ALT_MAP.items():
        if fname != filename:
            continue
        # Match markdown image: ![anything](path)
        pattern = re.escape(f'![{re.escape("")}') + r'[^\]]*' + re.escape(f']({img_path})')
        # Simpler: just replace the exact alt text part
        old_pattern = f'![在这里插入图片描述]({img_path})'
        if old_pattern in content:
            content = content.replace(old_pattern, f'![{new_alt}]({img_path})')
        
        old_pattern2 = f'![外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传]({img_path})'
        if old_pattern2 in content:
            content = content.replace(old_pattern2, f'![{new_alt}]({img_path})')
        
        # Also handle alt text that is just the filename like ![031_1.png](...)
        base_name = os.path.basename(img_path)
        old_pattern3 = f'![{base_name}]({img_path})'
        if old_pattern3 in content:
            content = content.replace(old_pattern3, f'![{new_alt}]({img_path})')
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    updated = 0
    for f in os.listdir(POSTS_DIR):
        if not f.endswith('.mdx'):
            continue
        filepath = os.path.join(POSTS_DIR, f)
        if fix_alt_text(filepath, f):
            print(f"[UPDATED] {f}")
            updated += 1
    
    print(f"\nTotal updated: {updated} files")

if __name__ == '__main__':
    main()
