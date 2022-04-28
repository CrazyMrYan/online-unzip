import { fileType } from "../constant/fileType";
import { IGNORE_FOLDER } from "../constant/ignoreFolder";
export const getFileNameExtension = function (fileName) {
  const index = fileName.lastIndexOf("."); // 获取指定字符串最后一次出现的位置，返回index
  const result = fileName.substr(index + 1); // substr(start, length) 抽取从start下标开始的length个字符，返回新的字符串
  return result;
};

export const queryFileType = function (fileName, type) {
  if (!fileType[type]) return alert("不支持该类型");
  return fileType[type](getFileNameExtension(fileName));
};

export const getFileSize = (size) => {
  //把字节转换成正常文件大小
  if (!size || typeof size !== "number") return "";
  const num = 1024.0; //byte
  if (size < num) return size + "B";
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + "KB"; //kb
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
  return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
};

export const getCurrentFolder = (filePath) => {
  const dirs = filePath.split("/");
  return dirs[dirs.length - 2];
};
export const getParentFolder = (filePath, dir) => {
  const dirs = filePath.split("/");
  return dirs[dirs.length - (dir ? 3 : 2)];
};
export const getFileName = (filePath) => {
  return filePath.slice(filePath?.lastIndexOf("/") + 1, filePath.length);
};
export const getFileId = (isFolder, file) => {
  return isFolder ? getCurrentFolder(file, true) : getFileName(file);
};
export const processIgnoreFolder = (file) => {
  let canIgnore = false;
  IGNORE_FOLDER.forEach((item) => {
    if (file.indexOf(item) !== -1) canIgnore = true;
  });
  return canIgnore;
};
