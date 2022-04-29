import { getFileId, getFileSize } from "./getFileInfo";
import dayjs from "dayjs";
class CreateFileInfo {
  constructor(type, file, content, size = 0) {
    const { id, date } = file;
    this.type = type;
    this.content = content;
    this.size = getFileSize(size);
    this.date = dayjs(date).format("YYYY-MM-DD");
    this.name = id;
  }
}

export const image = async (fliesList, file) => {
  const fileInfo = await fliesList[file.name]?.async("blob");
  const content = window.URL.createObjectURL(fileInfo);
  return new CreateFileInfo("image", file, content, fileInfo.size);
};

export const text = async (fliesList, file) => {
  const content = await fliesList[file.name]?.async("string");
  const size = new Blob([content]).size;
  return new CreateFileInfo("text", file, content, size);
};

export const PDF = async (fliesList, file) => {
  const fileInfo = await fliesList[file.name]?.async("blob");
  const content = fileInfo.arrayBuffer();
  return new CreateFileInfo("pdf", file, await content, fileInfo.size);
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
