export const shortenDate = (dateStr) => {
  if (dateStr) {
    const isoDate = new Date(dateStr);
    const year = isoDate.getFullYear();
    let month = String(isoDate.getMonth() + 1).padStart(2, "0");
    let day = String(isoDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
};

export const formatDate = (dateStr) => {
  const isoDate = new Date(dateStr);
  return isoDate.toLocaleDateString("en-GB"); // dd/mm/yyyy
};
