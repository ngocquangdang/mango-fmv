import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  ACCESS_TOKEN,
  ID_TOKEN,
  TOKEN_IAT,
  REFRESH_TOKEN,
  ONE_DAY,
} from "./constants";
import { saveLocalParams } from "./storage";

export const getCookie = (name: string) => cookie.get(name);

export const setCookie = (
  name: string,
  value: string,
  options?: Partial<unknown>
) => {
  cookie.set(name, value, {
    sameSite: "lax",
    ...options,
  });
};

export const removeCookie = (name: string) => {
  cookie.remove(name);
};

export const setCookieToken = (
  accessToken: string,
  idToken: string,
  refreshToken: string,
  expires: number = 0.5,
  cb?: () => void
) => {
  cookie.set(ACCESS_TOKEN, accessToken, { expires, sameSite: "lax" });
  cookie.set(ID_TOKEN, idToken, { expires, sameSite: "lax" });
  cookie.set(REFRESH_TOKEN, refreshToken, { expires, sameSite: "lax" });

  if (refreshToken) {
    saveLocalParams({ [TOKEN_IAT]: Date.now().toString() });
  }

  if (cb) cb();
};

export const getAccessToken = () => {
  return cookie.get(ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return cookie.get(REFRESH_TOKEN);
};

export const getIdToken = () => {
  return cookie.get(ID_TOKEN);
};

export const hasLoggedIn = () => {
  return getAccessToken() != null;
};

export const removeCookieToken = () => {
  cookie.remove(ACCESS_TOKEN);
  cookie.remove(ID_TOKEN);
  cookie.remove(REFRESH_TOKEN);
};

export const handleCookies = (
  accessToken: string,
  idToken: string,
  refreshToken: string
) => {
  const { exp, iat }: { exp: number; iat: number } = jwtDecode(accessToken);
  const expires = Math.round((exp - iat) / (ONE_DAY / 1000)) || undefined;

  setCookieToken(accessToken, idToken, refreshToken, expires);
};

export const logout = () => {
  removeCookieToken();
};
