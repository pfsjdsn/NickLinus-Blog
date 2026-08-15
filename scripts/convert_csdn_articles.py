#!/usr/bin/env python3
"""Convert selected CSDN articles to Fumadocs MDX format."""

import os
import re
import shutil

CSDN_DIR = r'C:\Users\admin\Desktop\NickLinus Blog\JavaScript_dbt@lll的博客-CSDN博客'
POSTS_DIR = r'C:\Users\admin\Desktop\NickLinus Blog\content\posts'
IMAGES_DIR = r'C:\Users\admin\Desktop\NickLinus Blog\public\images'
ASSETS_DIR = os.path.join(CSDN_DIR, 'assets')

# 47 articles selected by user: file_number -> english_slug
ARTICLE_MAP = {
    '001': 'js-push-unshift-pop-shift',
    '002': 'js-decimal-to-percentage',
    '003': 'js-split-string-by-dash',
    '004': 'js-date-dash-slash-replace',
    '009': 'js-extract-numbers-from-string',
    '016': 'js-find-filter-array',
    '022': 'js-window-close-basic',
    '025': 'js-eval-string-to-code',
    '026': 'js-includes-method',
    '030': 'js-save-two-decimals-percentage',
    '031': 'js-remove-empty-strings-array',
    '032': 'js-find-largest-number-array',
    '034': 'js-filter-usage',
    '035': 'js-array-dedup-after-push',
    '037': 'js-extract-between-braces',
    '043': 'js-this-set-add-property',
    '045': 'js-setinterval-timer',
    '047': 'js-get-array-max-value',
    '048': 'js-get-object-key-value-count',
    '049': 'js-timestamp-date-conversion',
    '050': 'js-remove-empty-falsy-values-array',
    '051': 'js-replace-global',
    '053': 'js-time-format-conversion',
    '054': 'js-switch-case-multiple-conditions',
    '057': 'js-truncate-string-ellipsis',
    '059': 'js-multiplication-table',
    '070': 'js-confirm-dialog',
    '072': 'js-window-open',
    '073': 'js-window-close-intro',
    '078': 'js-display-show-hide',
    '080': 'js-map-to-array',
    '082': 'js-string-split-by-comma',
    '083': 'js-string-substring-front-back',
    '084': 'js-array-push-object-override-fix',
    '085': 'js-get-next-day-date',
    '086': 'js-date-to-weekday',
    '087': 'js-get-next-5-days-dates',
    '088': 'js-time-difference-minutes-hours',
    '089': 'js-extract-around-substring',
    '091': 'js-switch-case-multiple-conditions-v2',
    '092': 'js-template-string-add-space',
    '093': 'js-assign-array-properties',
    '094': 'js-object-array-property-join-string',
    '096': 'js-get-first-last-day-of-year',
    '097': 'js-calculate-days-between-dates',
    '098': 'js-get-day-of-week',
    '102': 'js-number-utility-functions',
}

# Map languages not supported by Shiki
LANG_MAP = {
    'clike': 'c',
    'cobol': 'text',
}


def find_csdn_file(number):
    """Find CSDN .md file by its 3-digit number prefix."""
    for f in os.listdir(CSDN_DIR):
        if f.startswith(number + '_') and f.endswith('.md'):
            return os.path.join(CSDN_DIR, f)
    return None


def extract_metadata(content):
    """Extract title, date, article link, and body start index."""
    lines = content.split('\n')
    title = ''
    date = ''
    article_link = ''
    body_start = 0

    for i, line in enumerate(lines):
        if line.startswith('# ') and not title:
            title = line[2:].strip()
        elif line.startswith('> ' + '\u539f\u521b'):  # > 原创
            m = re.search(r'(\d{4}-\d{2}-\d{2})', line)
            if m:
                date = m.group(1)
        elif line.startswith('> ' + '\u6587\u7ae0\u94fe\u63a5'):  # > 文章链接
            article_link = line.split('\uff1a', 1)[-1].strip()  # split on ：
            body_start = i + 1
            break

    return title, date, article_link, body_start


def infer_code_language(code):
    """Infer programming language from code block content."""
    cl = code.lower()
    if any(t in cl for t in [
        '<html', '<body', '<head', '<div', '<script', '<!doctype',
        '<input', '<button', '<h1', '<table', '<tr', '<td', '<br',
        '<span', '<p>', '<img', '<a ', '<select', '<option',
    ]):
        return 'html'
    return 'javascript'


def clean_code_blocks(body):
    """Add language hints to bare code blocks; map unsupported languages."""
    lines = body.split('\n')
    result = []
    in_code = False
    code_lines = []
    lang = ''

    for line in lines:
        s = line.strip()
        if s.startswith('```'):
            if not in_code:
                in_code = True
                lang = s[3:].strip()
                if lang:
                    lang = LANG_MAP.get(lang, lang)
                code_lines = []
            else:
                in_code = False
                if not lang:
                    lang = infer_code_language('\n'.join(code_lines))
                result.append('```' + lang)
                result.extend(code_lines)
                result.append('```')
                lang = ''
                code_lines = []
        elif in_code:
            code_lines.append(line)
        else:
            result.append(line)

    return '\n'.join(result)


def fix_images(body):
    """Convert ./assets/ paths to /images/ and clean alt text."""
    def repl(m):
        return '![](/images/' + m.group(1) + ')'

    # Greedy match to handle nested brackets in alt text (e.g. ![[...]](path))
    body = re.sub(r'!\[.*\]\(\./assets/([^)]+)\)', repl, body)
    return body


def escape_mdx_braces(body):
    """Escape { and } outside code blocks and inline code for MDX safety."""
    lines = body.split('\n')
    result = []
    in_code = False

    for line in lines:
        s = line.strip()
        if s.startswith('```'):
            in_code = not in_code
            result.append(line)
        elif not in_code:
            chars = []
            in_inline = False
            for ch in line:
                if ch == '`':
                    in_inline = not in_inline
                    chars.append(ch)
                elif not in_inline and ch in '{}':
                    chars.append('\\' + ch)
                else:
                    chars.append(ch)
            result.append(''.join(chars))
        else:
            result.append(line)

    return '\n'.join(result)


def generate_description(title, body):
    """Generate a description from title and first meaningful paragraph."""
    # Strip prefix for fallback
    clean_title = title
    for prefix in ['JS\u2014\u2014', 'JavaScript\u2014\u2014', 'JS\u2014',
                    'JavaScript\u2014', 'JS\u2014\u2014']:
        if clean_title.startswith(prefix):
            clean_title = clean_title[len(prefix):]
            break
    clean_title = clean_title.strip()

    lines = body.split('\n')
    parts = []
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
        # Skip blockquotes, images, headings, table rows, short bold lines
        if s.startswith('> ') or s.startswith('![') or s.startswith('#'):
            continue
        if s.startswith('|'):
            continue
        if s.startswith('**') and s.endswith('**') and len(s) < 30:
            continue
        if s.startswith('- ') and len(s) < 25:
            continue
        if len(s) >= 10:
            parts.append(s)
            joined = ''.join(parts)
            if len(joined) >= 60:
                break

    raw = ' '.join(parts)
    raw = raw.replace('**', '').replace('`', '').replace('"', "'")
    raw = raw.strip()

    if len(raw) >= 15:
        if len(raw) > 100:
            raw = raw[:97] + '...'
        return raw

    # Fallback
    return 'JavaScript\u4e2d' + clean_title + '\u7684\u7528\u6cd5\u4e0e\u5b9e\u73b0\u65b9\u6cd5\u3002'


def convert(number, slug):
    """Convert a single CSDN article to MDX."""
    fp = find_csdn_file(number)
    if not fp:
        print('  [SKIP] ' + number + ' not found')
        return False, set()

    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()

    title, date, link, body_start = extract_metadata(content)
    if not title:
        print('  [SKIP] ' + number + ' no title')
        return False, set()
    if not date:
        date = '2026-08-13'

    lines = content.split('\n')
    body = '\n'.join(lines[body_start:]).lstrip('\n')

    # Collect image filenames before cleaning
    images = set(re.findall(r'\./assets/([^)]+)', body))

    # Clean body
    body = fix_images(body)
    body = clean_code_blocks(body)
    body = escape_mdx_braces(body)

    # Generate description
    desc = generate_description(title, body)

    # Build frontmatter
    fm = (
        '---\n'
        'title: "' + title + '"\n'
        'description: "' + desc + '"\n'
        'date: "' + date + '"\n'
        'tags:\n'
        '  - JavaScript\n'
        'published: true\n'
        '---'
    )

    link_line = ''
    if link:
        link_line = '> ' + '\u6587\u7ae0\u94fe\u63a5\uff1a' + link

    if link_line:
        mdx = fm + '\n\n' + link_line + '\n\n' + body + '\n'
    else:
        mdx = fm + '\n\n' + body + '\n'

    out_path = os.path.join(POSTS_DIR, slug + '.mdx')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(mdx)

    print('  [OK] ' + number + ' -> ' + slug + '.mdx')
    return True, images


def copy_images(all_images):
    """Copy needed image assets to public/images/."""
    os.makedirs(IMAGES_DIR, exist_ok=True)
    copied = 0
    for img in sorted(all_images):
        src = os.path.join(ASSETS_DIR, img)
        dst = os.path.join(IMAGES_DIR, img)
        if os.path.exists(src):
            shutil.copy2(src, dst)
            print('  [IMG] ' + img)
            copied += 1
        else:
            print('  [WARN] image not found: ' + img)
    return copied


def main():
    print('=' * 60)
    print('Converting ' + str(len(ARTICLE_MAP)) + ' CSDN articles to MDX')
    print('=' * 60)

    ok = 0
    all_images = set()
    for num in sorted(ARTICLE_MAP.keys()):
        slug = ARTICLE_MAP[num]
        success, imgs = convert(num, slug)
        if success:
            ok += 1
            all_images.update(imgs)

    print('')
    print('Converted: ' + str(ok) + '/' + str(len(ARTICLE_MAP)))
    print('')
    print('Copying ' + str(len(all_images)) + ' images...')
    n = copy_images(all_images)
    print('Copied: ' + str(n) + ' images')
    print('')
    print('Done!')


if __name__ == '__main__':
    main()
