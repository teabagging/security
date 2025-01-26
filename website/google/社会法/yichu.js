const fs = require('fs');
const path = require('path');

// 文件夹路径
const folderPath = 'C:/Users/Administrator/Desktop/English/website/google/司法解释'; // 请替换为你的文件夹路径

// 检查文件夹是否存在
if (!fs.existsSync(folderPath)) {
  console.error('文件夹不存在:', folderPath);
  return;
}

// 输出文件夹路径，检查是否正确
console.log('正在处理文件夹:', folderPath);

// 读取文件夹中的所有文件
fs.readdirSync(folderPath).forEach(fileName => {
  // 构建文件的完整路径
  const filePath = path.join(folderPath, fileName);

  // 如果是文件而非目录
  if (fs.statSync(filePath).isFile()) {
    // 使用正则表达式移除括号及其中的内容
    const newFileName = fileName.replace(/\(.*?\)/g, '');

    // 如果文件名发生了变化，重命名文件
    if (newFileName !== fileName) {
      const newFilePath = path.join(folderPath, newFileName);
      fs.renameSync(filePath, newFilePath); // 重命名文件
      console.log(`重命名: ${fileName} -> ${newFileName}`);
    }
  }
});
