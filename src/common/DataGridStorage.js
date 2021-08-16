export const ROWS_KEY = "rows";
export const setStorageDataGridRows = (data) => {
  localStorage.setItem(ROWS_KEY, data);
};

export const getStorageDataGridRows = () => localStorage.getItem(ROWS_KEY);
