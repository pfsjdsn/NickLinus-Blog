// scripts/clean-vue-headers.js
const fs = require('fs');
const path = require('path');

const targetDir = 'posts/Vue';

// 递归获取所有 index.mdx 文件
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file === 'index.mdx') {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const articleFiles = getAllFiles(targetDir);

articleFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // 只删除以 "> 原创 于" 开头的那一行（包含版权声明和 GEO 检测）
  // 保留 "> 文章链接" 行
  content = content.replace(/^> 原创 于 .*? 本内容遵循CC 4.0 BY-SA版权协议 .*?(?:GEO检测)?\n/gm, '');

  // 清理可能留下的多余空行
  content = content.replace(/\n{3,}/g, '\n\n');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ 已清理: ${path.basename(path.dirname(filePath))}`);
});

console.log('🎉 所有文章的“原创 于”行已删除，“文章链接”已保留！');