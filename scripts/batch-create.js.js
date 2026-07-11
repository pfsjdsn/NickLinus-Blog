// scripts/batch-create.js
const fs = require('fs');
const { execSync } = require('child_process');

// 你的文章标题列表（从CSDN复制）
const titles = [
  "Vue3 响应式原理详解",
  "微信小程序登录流程完整实现",
  "JavaScript 闭包彻底搞懂",
  // ... 把你想迁移的文章标题都列在这里
];

titles.forEach(title => {
  try {
    const slug = title
      .replace(/[？?！!。，,、：:；;""''（）()【】\[\]]/g, '') // 移除标点
      .replace(/\s+/g, '-') // 空格转短横线
      .toLowerCase();
    execSync(`pnpm new-post "${slug}"`, { stdio: 'inherit' });
    console.log(`✅ 已创建: ${slug}`);
  } catch (e) {
    console.log(`❌ 创建失败: ${title}`);
  }
});