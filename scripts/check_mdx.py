import os, re

POSTS_DIR = r'C:\Users\admin\Desktop\NickLinus Blog\content\posts'
js_files = sorted([f for f in os.listdir(POSTS_DIR) if f.startswith('js-') and f.endswith('.mdx')])
issues = []

for fname in js_files:
    with open(os.path.join(POSTS_DIR, fname), 'r', encoding='utf-8') as f:
        content = f.read()

    parts = content.split('---', 2)
    if len(parts) < 3:
        issues.append(fname + ': no frontmatter')
        continue
    body = parts[2]

    lines = body.split('\n')
    in_code = False
    in_inline = False
    for i, line in enumerate(lines):
        s = line.strip()
        if s.startswith('```'):
            in_code = not in_code
            continue
        if in_code:
            continue
        for j, ch in enumerate(line):
            if ch == '`':
                in_inline = not in_inline
            elif not in_inline and ch in '{}':
                if j == 0 or line[j-1] != '\\':
                    issues.append(fname + ':' + str(i+1) + ' unescaped ' + ch + ': ' + line[:80])

    fm = parts[1]
    title_match = re.search(r'title:\s*"([^"]*)"', fm)
    if not title_match:
        issues.append(fname + ': title parse issue')

if issues:
    print('Found ' + str(len(issues)) + ' issues:')
    for issue in issues[:30]:
        print('  ' + issue)
else:
    print('No issues found in ' + str(len(js_files)) + ' files')
