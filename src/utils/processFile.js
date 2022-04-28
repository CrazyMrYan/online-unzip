import { getFileId } from "./getFileInfo";
class CreateFileInfo {
  constructor(type, name, content, size = 0) {
    this.type = type;
    this.name = name;
    this.content = content;
    this.size = size;
  }
}

export const image = async (fliesList, file) => {
  const fileInfo = await fliesList[file.name]?.async("blob");
  const content = window.URL.createObjectURL(fileInfo);
  return new CreateFileInfo("image", file.id, content, fileInfo.size);
};

export const text = async (fliesList, file) => {
  const content = await fliesList[file.name]?.async("string");
  return new CreateFileInfo("text", file.id, content);
};

export const PDF = async (fliesList, file) => {
  const fileInfo = await fliesList[file.name]?.async("blob");
  const content = fileInfo.arrayBuffer();
  return new CreateFileInfo("pdf", file.id, await content, fileInfo.size);
};

export const settleDocuments = (file, fileName) => {
  const { name, parent, date, dir } = file;
  const id = getFileId(dir, fileName);
  return {
    name,
    parent,
    date,
    dir,
    id,
  };
};
