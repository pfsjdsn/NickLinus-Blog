import os
import re

POSTS_DIR = r'C:\Users\admin\Desktop\NickLinus Blog\content\posts'

def extract_frontmatter_and_body(content):
    parts = content.split('---', 2)
    if len(parts) >= 3:
        fm_text = parts[1]
        body = parts[2]
        title_match = re.search(r'^title:\s*"([^"]+)"', fm_text, re.MULTILINE)
        title = title_match.group(1) if title_match else ''
        desc_match = re.search(r'^description:\s*"([^"]*)"', fm_text, re.MULTILINE)
        current_desc = desc_match.group(1) if desc_match else ''
        return title, current_desc, fm_text, body
    return None, None, None, content

def is_valid_desc(text):
    """Check if extracted text is a valid description (not code/fragment)."""
    if not text or len(text) < 10:
        return False
    bad_keywords = ['192.168', 'D:\\', '://', 'app.js', 'wxml文件', 'js文件', 'json文件', 
                    'less文件', 'wxss文件', 'http.js', 'util.js', 'height:', 'width:', 
                    'function', 'const ', 'var ', 'module.exports', 'console.log',
                    'res.windowWidth', 'res.windowHeight', 'getApp()', 'Page({',
                    'bindtap', 'catchtap', 'wx.', 'wxml', 'show-location']
    for kw in bad_keywords:
        if kw in text:
            return False
    return True

def smart_description(title, body, current_desc):
    clean_title = title.replace('微信小程序——', '').replace('微信小程序', '').strip()
    
    # If current description is already good (>40 chars and valid), keep it
    if current_desc and len(current_desc) > 40 and is_valid_desc(current_desc):
        return None  # Keep existing
    
    # Strategy 1: Extract first meaningful paragraph from non-code text
    lines = body.split('\n')
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
        if len(s) >= 15:
            desc_parts.append(s)
            if len(''.join(desc_parts)) >= 60:
                break
    
    raw_desc = ' '.join(desc_parts).replace('**', '').replace('`', '').replace('"', '')
    if is_valid_desc(raw_desc):
        if len(raw_desc) > 100:
            raw_desc = raw_desc[:97] + '...'
        return raw_desc.strip()
    
    # Strategy 2: Build from title and structure keywords
    tech_keywords = []
    keyword_map = [
        ('wxml', 'wxml'), ('js', 'js逻辑'), ('json', 'json配置'), ('less', 'less样式'), ('wxss', 'wxss样式'),
        ('app.js', 'app.js'), ('http.js', 'http.js'), ('util.js', 'util.js'),
        ('API', 'API接口'), ('HTTP', 'HTTP请求')
    ]
    for term, label in keyword_map:
        if term.lower() in body.lower() or term in body:
            if label not in tech_keywords:
                tech_keywords.append(label)
    
    # Determine article category based on title
    category_map = [
        (['错误', '报错'], '云开发问题排查'),
        (['api', '接口', '配置'], 'API配置方法'),
        (['组件', 'component'], '组件封装'),
        (['样式', 'css', 'less', 'wxss'], '样式配置'),
        (['性能', '优化'], '性能优化'),
        (['授权', '弹窗', '手机号', 'modal', 'showmodal'], '功能实现'),
        (['git', 'devtools'], '工具配置'),
        (['目录', '命名'], '目录规范'),
        (['字符串', '数组', '对象', '分割'], '操作方法'),
        (['上传', '下载', 'upload'], '文件上传配置'),
        (['tabbar', '跳转', 'navigator'], '页面跳转配置'),
        (['云开发'], '云开发问题排查'),
        (['computed', 'npm'], 'npm包配置'),
        (['双向绑定'], '数据绑定实现'),
        (['视频', 'fullscreen', '全屏'], '视频播放配置'),
        (['单选', '多选', 'radio', 'checkbox'], '列表选择控制'),
        (['下拉刷新'], '下拉刷新配置'),
        (['遮罩层', 'overlay'], '遮罩层配置'),
        (['单行', '省略', 'text-overflow'], '文本样式处理'),
        (['定位', '位置', '拒绝', '地图', 'map', 'location'], '地图定位配置'),
        (['swiper', '轮播'], '轮播图自定义配置'),
        (['scroll', '横向'], '横向滚动布局'),
        (['全局'], '全局变量配置'),
        (['调试', '打印'], '调试技巧'),
        (['分包', 'package'], '分包加载配置'),
        (['事件', '冒泡', 'catch'], '事件处理'),
        (['页面栈', 'getCurrentPages'], '页面栈获取方法'),
        (['缓存', 'storage'], '缓存存取方法'),
        (['view', '内容'], '内容获取方法'),
        (['适配', '屏幕'], '屏幕适配方案'),
        (['格式化', 'format'], '代码格式化配置'),
        (['calc', '计算'], '自动计算配置'),
        (['select', '选择器'], '自定义选择器实现'),
        (['电话', '拨打', 'call'], '拨打电话组件封装'),
        (['发布', '订阅', 'pubsub'], '消息发布订阅配置'),
        (['移动', '拖拽'], '元素移动实现'),
        (['获取', '元素'], '元素获取方法'),
        (['添加', '元素'], '动态添加元素'),
    ]
    
    category = '配置方法'
    for keywords, cat in category_map:
        if any(k in title.lower() or k in body.lower() for k in keywords):
            category = cat
            break
    
    if tech_keywords:
        kw_str = '、'.join(tech_keywords[:3])
        desc = f"微信小程序{clean_title}的{category}，包含{kw_str}等完整代码示例。"
    else:
        desc = f"微信小程序{clean_title}的{category}与实现说明。"
    
    if len(desc) > 100:
        desc = desc[:97] + '...'
    return desc.strip()

def main():
    files = sorted([f for f in os.listdir(POSTS_DIR) if f.startswith('miniprogram') and f.endswith('.mdx')])
    
    for f in files:
        with open(os.path.join(POSTS_DIR, f), 'r', encoding='utf-8') as fh:
            content = fh.read()
        title, current_desc, fm_text, body = extract_frontmatter_and_body(content)
        if not title:
            continue
        
        new_desc = smart_description(title, body, current_desc)
        
        if new_desc is None:
            print(f"[KEEP] {f}")
            print(f"  -> {current_desc}")
            print()
            continue
        
        # Replace description line using regex
        new_fm_text = re.sub(
            r'^description:.*$', 
            f'description: "{new_desc}"',
            fm_text,
            flags=re.MULTILINE
        )
        new_content = f"---{new_fm_text}---{body}"
        
        with open(os.path.join(POSTS_DIR, f), 'w', encoding='utf-8') as fh:
            fh.write(new_content)
        
        print(f"[UPDATED] {f}")
        print(f"  OLD: {current_desc}")
        print(f"  NEW: {new_desc}")
        print()

if __name__ == '__main__':
    main()
