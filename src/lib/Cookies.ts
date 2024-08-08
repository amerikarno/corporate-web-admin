import Cookies from "js-cookie";

const TOKEN_KEY = "token";
const REFRESH =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOnsiVVVJRCI6IjNhOGRlZDBjLTdkZjEtNDc5Mi04NmY1LWQ2MjE2NGJkMWZjNSIsIkNvdW50ZXIiOjB9LCJpZCI6IjEiLCJlbWFpbCI6ImU1MDJmNGM3Yzc2NmM1NDM5MWYwOGE5MWQ2Nzc2Y2M0MmQ1MTI3OWYyMzlhOTdlNzM2YzI5ZmVjYzhjOTU5ZWQiLCJncm91cHMiOlswXSwicGVybWlzc2lvbnMiOlswXSwicm9sZXMiOlswXSwidXNlcklkIjoiIiwibG9naW5TdGF0dXMiOiIiLCJFcnJvciI6bnVsbCwiZXhwIjoxNzI1Njc1MjAyLCJuYmYiOjE3MjMwODMyMDcsImlhdCI6MTcyMzA4MzIwMn0.yhNm3a-vQZpfM5J7nvaTqx4Nh4tQ1-c9YaxKPNYG2ko";

export const setCookies = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 });
  Cookies.set("refreshToken", REFRESH, { expires: 30 });
};

export const getCookies = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeCookies = () => {
  Cookies.remove(TOKEN_KEY);
};
