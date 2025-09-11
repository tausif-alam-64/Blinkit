export const validURLConvert = (name) => {
  if (!name) return ""; // fallback if name is undefined/null
  return name
    .toString()
    .trim()
    .replaceAll(" ", "-")
    .replaceAll(",", "-")
    .replaceAll("&", "-")
    .toLowerCase();
};
