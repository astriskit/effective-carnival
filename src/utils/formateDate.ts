export const formatDate = (date: number | undefined) => {
  if (!date) return "";
  const dt = new Date(date);
  return `${dt.getFullYear()}-${dt.getMonth().toString().padStart(2, "0")}-${dt
    .getDate()
    .toString()
    .padStart(2, "0")}`;
};
