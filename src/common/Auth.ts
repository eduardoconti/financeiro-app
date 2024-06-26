export const TOKEN_KEY = "token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserIdFromToken = () => {
  const parse = JSON.parse(
    atob((localStorage.getItem(TOKEN_KEY) as string).split(".")[1])
  );
  return parse.userId;
};
export const login = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
