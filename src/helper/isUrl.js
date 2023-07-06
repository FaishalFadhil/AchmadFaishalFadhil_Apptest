export const isUrl = string => {
  const urlPattern =
    /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:\d{1,5})?([/?#].*)?$/i;
  return urlPattern.test(string);
};
