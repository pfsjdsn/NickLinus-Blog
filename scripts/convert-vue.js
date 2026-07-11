// scripts/convert-vue-utf8.js
const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\admin\\Downloads\\Vue_dbt@lll的博客-CSDN博客';
const targetDir = 'posts/Vue';

const titles = [
  "Vue——vue3中setup() 对象解构直接使用属性toRefs写法",
  "Vue——自动过滤用户输入的首尾空白字符",
  "Vue——input输入内容去除空格",
  "前端——文件上传同名冲突检测的实现方案",
  "Vue——vue中v-for循环图片无法显示",
  "Vue——vue3中setup() 组件中引入生命周期函数写法",
  "Vue——vue3路由搭建",
  "Vue——Vue时间格式转化",
  "Vue——element-ui 中的message消息提示",
  "前端——问卷系统评分题保存草稿报错的解决方案",
  "Vue——vue3中vuex映射状态数据和方法",
  "Vue——input 中的lazy",
  "Vue——vue3报错 ＜Suspense＞ slots expect a single root node.",
  "Vue——vue2Mixin 的缺点",
  "Vue——vue3中mockjs模拟获取数据",
  "Vue——vuex的应用场景及属性",
  "Vue——vue3路由alias别名写法",
  "Vue——for 循环 写法",
  "Vue——Vue中本地图片src路径对但是图片不出来的问题",
  "Vue—— Vue 3 + Element Plus 表单输入校验和自动格式化工具函数详解",
  "Vue——vue3视图命名写法",
  "Vue——vue3中setup() watchEffect监听属性写法",
  "Vue——vue3 之 代码生成器原理",
  "Vue——$attrs的使用（父组件传值给孙组件）",
  "Vue——Vue3 + Ant Design Vue 实现审批流程可视化设计",
  "Vue——vue3中setup() computed 计算属性写法",
  "Vue——vue获取当前页面路由",
  "前端——WebSocket实时通信在项目中的应用",
  "前端——第三方SDK集成指南（以高德地图为例）",
  "Vue——@vue中 input 和 @click 区别",
  "Vue——vue3 打包优化与资源压缩",
  "前端——移动端调试技巧与工具推荐",
  "Vue——获取爷组件的值&&获取父组件的值&&获取子组件的值",
  "Vue——两个子组件之间的传值"
];

function removeNumberPrefix(filename) {
  return filename.replace(/^\d+_/, '');
}

function removeExtension(filename) {
  return filename.replace(/\.(md|html|txt)$/, '');
}

function titleToSlug(title) {
  let slug = title
    .replace(/^Vue——/, '')
    .replace(/^前端——/, '')
    .replace(/[？?！!。，,、：:；;""''（）()【】\[\]]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .substring(0, 40);
  if (!slug) slug = 'article';
  return slug;
}

// 读取源目录下的所有文件
const files = fs.readdirSync(sourceDir);
console.log(`📁 源目录共有 ${files.length} 个文件`);

titles.forEach(title => {
  // 提取核心搜索词（去掉“Vue——”、“前端——”前缀）
  const searchKey = title
    .replace(/^Vue——/, '')
    .replace(/^前端——/, '')
    .trim();

  console.log(`🔍 搜索: "${searchKey}"`);

  let matchedFile = null;

  for (const file of files) {
    const nameWithoutPrefix = removeNumberPrefix(file);
    const nameWithoutExt = removeExtension(nameWithoutPrefix);

    // 直接匹配
    if (nameWithoutExt.includes(searchKey)) {
      matchedFile = file;
      break;
    }

    // 如果直接匹配失败，尝试去除特殊字符后再匹配
    const searchKeyClean = searchKey.replace(/[＜＞@$&]/g, '');
    const nameClean = nameWithoutExt.replace(/[＜＞@$&]/g, '');
    if (nameClean.includes(searchKeyClean)) {
      matchedFile = file;
      break;
    }
  }

  if (!matchedFile) {
    console.log(`❌ 找不到匹配: ${title}`);
    return;
  }

  const sourcePath = path.join(sourceDir, matchedFile);
  const sourceContent = fs.readFileSync(sourcePath, 'utf8');

  const slug = titleToSlug(title);
  const targetPath = path.join(targetDir, slug, 'index.mdx');

  const frontMatter = '---\n' +
    'title: "' + title + '"\n' +
    'date: ' + new Date().toISOString().split('T')[0] + '\n' +
    'description: ""\n' +
    'author: "NickLinus"\n' +
    'category: "Vue"\n' +
    'thumbnail: ""\n' +
    'published: true\n' +
    '---\n\n';

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, frontMatter + sourceContent, 'utf8');
  console.log(`✅ 已迁移: ${title} → ${slug}`);
});

console.log('🎉 所有文章迁移完成！');