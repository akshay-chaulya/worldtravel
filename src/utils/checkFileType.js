const checkFileType = (file) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  return allowedMimeTypes.includes(file.type);
};

export default checkFileType;
