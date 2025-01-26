const fs = require('fs');
const path = require('path');

// 设置文件夹路径
const folderPath = 'C:/Users/Administrator/Desktop/English/website/google/案例/平权平责';  // 请替换为你实际的文件夹路径

// 读取文件夹中的所有文件
fs.readdirSync(folderPath).forEach(file => {
  // 获取文件的完整路径
  const filePath = path.join(folderPath, file);

  // 检查是否是文件且扩展名是 .txt
  if (fs.statSync(filePath).isFile() && path.extname(file) === '.txt') {
    // 新的文件路径，替换扩展名为 .md
    const newFilePath = path.join(folderPath, path.basename(file, '.txt') + '.md');
    
    // 重命名文件
    fs.renameSync(filePath, newFilePath);
    
    console.log(`重命名: ${file} -> ${path.basename(file, '.txt') + '.md'}`);
  }
});
