export const MODE_KEY = "mode";
export const isDefinedMode = () => localStorage.getItem(MODE_KEY) !== null;
export const getModeType = () => {
  return localStorage.getItem(MODE_KEY) !== "false";
};

export const setMode = (mode: string) => {
  localStorage.setItem(MODE_KEY, mode);
};
