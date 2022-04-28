const TEXT_TYPE = ["js", "txt", "md", "json", "vue", "ts", "tsx", "html", "sh"];
const IMG_TYPE = [
  "png",
  "jpg",
  "jpeg",
  "bmp",
  "gif",
  "webp",
  "psd",
  "svg",
  "tiff",
];

export const fileType = {
  image(result) {
    return IMG_TYPE.indexOf(result.toLowerCase()) !== -1;
  },
  text(result) {
    return TEXT_TYPE.indexOf(result.toLowerCase()) !== -1;
  },
  pdf(result) {
    return ["pdf"].indexOf(result.toLowerCase()) !== -1;
  },
};
