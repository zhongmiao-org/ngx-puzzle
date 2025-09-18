const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始构建生产版本...');

// 1. 运行正常构建
try {
  execSync('ng build puzzle --configuration production', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}

console.log('✅ 基础构建完成');

// 2. 后处理：移除console语句
const distPath = path.join(__dirname, '..', 'dist', 'puzzle');

function removeConsoleFromFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 使用保守的console移除策略，只处理安全的情况
  const originalLength = content.length;

  // 只移除行级别的独立console语句，避免破坏复杂语法
  // 匹配整行的console语句
  content = content.replace(/^\s*console\.(log|warn|error|info|debug|trace|table|group|groupCollapsed|groupEnd|time|timeEnd|count|assert|clear|dir|dirxml)\s*\([^)]*\)\s*;?\s*$/gm, '');

  // 移除语句块中的console语句，但保留语句结构
  content = content.replace(/(\s+)console\.(log|warn|error|info|debug|trace|table|group|groupCollapsed|groupEnd|time|timeEnd|count|assert|clear|dir|dirxml)\s*\([^)]*\)\s*;/g, '$1// console removed');

  // 清理多余的空行
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

  if (content.length !== originalLength) {
    fs.writeFileSync(filePath, content);
    console.log(`📝 已处理文件: ${path.relative(distPath, filePath)}`);
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 跳过 schematics 目录，避免与 build-schematics.js 冲突
      if (file !== 'schematics') {
        processDirectory(fullPath);
      }
    } else if (file.endsWith('.mjs') || file.endsWith('.js')) {
      removeConsoleFromFile(fullPath);
    }
  });
}

console.log('🔧 开始移除console语句...');
processDirectory(distPath);

console.log('✅ 生产版本构建完成！Console语句已移除。');