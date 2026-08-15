import os, re, glob, ast

CSDN_DIR = r'C:/Users/admin/Desktop/NickLinus Blog/JavaScript_dbt@lll的博客-CSDN博客'
POSTS_DIR = r'C:/Users/admin/Desktop/NickLinus Blog/content/posts'

# Read the conversion script's ARTICLE_MAP
script_path = r'C:/Users/admin/Desktop/NickLinus Blog/scripts/convert_csdn_articles.py'
with open(script_path, 'r', encoding='utf-8') as f:
    script = f.read()

match = re.search(r'ARTICLE_MAP\s*=\s*(\{.*?\})', script, re.DOTALL)
if not match:
    print('Could not find ARTICLE_MAP')
    exit(1)

article_map = ast.literal_eval(match.group(1))

restored = 0
for num, slug in article_map.items():
    mdx_path = os.path.join(POSTS_DIR, slug + '.mdx')
    if not os.path.exists(mdx_path):
        print(f'Missing: {mdx_path}')
        continue

    csdn_files = glob.glob(os.path.join(CSDN_DIR, f'{num}_*.md'))
    if not csdn_files:
        print(f'No CSDN file for {num}')
        continue

    with open(csdn_files[0], 'r', encoding='utf-8') as f:
        csdn_content = f.read()

    date_match = re.search(r'于\s+(\d{4}-\d{2}-\d{2})', csdn_content)
    if not date_match:
        print(f'No date in {csdn_files[0]}')
        continue

    original_date = date_match.group(1)

    with open(mdx_path, 'r', encoding='utf-8') as f:
        mdx_content = f.read()

    new_mdx = re.sub(r'^date:\s*"[^"]+"', f'date: "{original_date}"', mdx_content, count=1, flags=re.MULTILINE)

    with open(mdx_path, 'w', encoding='utf-8') as f:
        f.write(new_mdx)

    restored += 1

print(f'Restored original dates for {restored} files')
