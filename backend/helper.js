const GetNewFileName = name => {
  const dotIndex = name.indexOf('.');
  return `${name.slice(0, dotIndex)}-${Date.now()}.${name.slice(dotIndex + 1)}`;
};

module.exports.GetNewFileName = GetNewFileName;
