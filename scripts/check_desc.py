import os
import re
import yaml

POSTS_DIR = r'C:\Users\admin\Desktop\NickLinus Blog\content\posts'

def extract_frontmatter_and_body(content):
    parts = content.split('---', 2)
    if len(parts) >= 3:
        fm = yaml.safe_load(parts[1])
        body = parts[2]
        return fm, body
    return None, content

def smart_description(title, body):
    """Generate a meaningful description from article content."""
    lines = body.split('\n')
    
    # Strategy 1: Extract first meaningful paragraph (non-code, non-heading, non-image)
    desc_parts = []
    in_code = False
    for line in lines:
        s = line.strip()
        if not s:
            continue
        if s.startswith('```'):
            in_code = not in_code
            continue
        if in_code:
            continue
        if s.startswith('> 文章链接'):
            continue
        if s.startswith('!['):
            continue
        if s.startswith('**') and s.endswith('**') and len(s) < 25:
            continue
        if s.startswith('#'):
            continue
        if s.startswith('- ') and len(s) < 20:
            continue
        if len(s) >= 10:
            desc_parts.append(s)
            if len(''.join(desc_parts)) >= 60:
                break
    
    raw_desc = ' '.join(desc_parts).replace('**', '').replace('`', '')
    if len(raw_desc) > 15:
        if len(raw_desc) > 100:
            raw_desc = raw_desc[:97] + '...'
        return raw_desc.strip()
    
    # Strategy 2: Extract from code block comments
    comments = []
    in_code = False
    for line in lines:
        s = line.strip()
        if s.startswith('```'):
            in_code = not in_code
            continue
        if in_code:
            # Extract Chinese comments
            if '//' in s or '#' in s or '<!--' in s:
                comment = re.sub(r'.*?//\s*', '', s)
                comment = re.sub(r'.*?#\s*', '', comment)
                comment = re.sub(r'<!--\s*(.*?)\s*-->', r'\1', comment)
                if len(comment) > 5 and any('\u4e00' <= c <= '\u9fff' for c in comment):
                    comments.append(comment)
    
    if comments:
        desc = ' '.join(comments[:2])
        if len(desc) > 100:
            desc = desc[:97] + '...'
        return desc.strip()
    
    # Strategy 3: Extract file/tech keywords from bold headings
    tech_keywords = []
    for line in lines:
        s = line.strip()
        if s.startswith('**') and s.endswith('**'):
            keyword = s.replace('**', '').replace('文件', '').replace('组件', '').strip()
            if keyword and len(keyword) < 20 and keyword not in tech_keywords:
                tech_keywords.append(keyword)
    
    # Strategy 4: Build from title and keywords
    clean_title = title.replace('微信小程序——', '').replace('微信小程序', '')
    
    if tech_keywords:
        if len(tech_keywords) <= 2:
            desc = f"介绍微信小程序{clean_title}的实现，包含 {', '.join(tech_keywords[:3])} 等关键代码示例。"
        else:
            desc = f"介绍微信小程序{clean_title}，涉及 {', '.join(tech_keywords[:3])} 等技术要点。"
    else:
        # Extract tech terms from body
        tech_terms = []
        for term in ['wxml', 'js', 'json', 'wxss', 'less', 'API', 'HTTP', '缓存', '组件', '授权', '弹窗', '轮播图', 'swiper', 'tabbar', 'scroll-view', 'navigator', 'modal']:
            if term.lower() in body.lower() or term in body:
                tech_terms.append(term)
        if tech_terms:
            desc = f"介绍微信小程序{clean_title}的完整实现，包含 {', '.join(tech_terms[:3])} 等核心配置。"
        else:
            desc = f"介绍微信小程序{clean_title}的实现方法与配置说明。"
    
    if len(desc) > 100:
        desc = desc[:97] + '...'
    return desc.strip()

def main():
    files = sorted([f for f in os.listdir(POSTS_DIR) if f.startswith('miniprogram') and f.endswith('.mdx')])
    print(f"Found {len(files)} miniprogram files\n")
    
    for f in files:
        with open(os.path.join(POSTS_DIR, f), 'r', encoding='utf-8') as fh:
            content = fh.read()
        fm, body = extract_frontmatter_and_body(content)
        if not fm:
            continue
        
        title = fm.get('title', '')
        current_desc = fm.get('description', '')
        new_desc = smart_description(title, body)
        
        # Keep good existing descriptions (>40 chars and meaningful)
        if current_desc and len(current_desc) > 40 and not current_desc.startswith('1.') and not current_desc.startswith('.'):
            status = 'KEEP'
        else:
            status = 'UPDATE'
        
        print(f"[{status}] {f}")
        print(f"  CURRENT: {current_desc}")
        if status == 'UPDATE':
            print(f"  NEW:     {new_desc}")
        print()

if __name__ == '__main__':
    main()
