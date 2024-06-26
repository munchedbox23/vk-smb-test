import { IRefreshTokenResponse, TTokenError } from "../types/user-types";
import { API } from "./constants";

export const checkResponse = <T>(response: Response): Promise<T> => {
  return response.ok
    ? response.json()
    : response.json().then((error) => Promise.reject(error));
};

export const request = <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(url, options).then(checkResponse<T>);
};

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([$?*|{}()\]/]+)/g, "$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string,
  props: {
    [key: string]: any;
    expires?: string | number | Date;
    expiresString?: string;
  } = {}
): void {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    props.expires = d;
  }
  if (exp instanceof Date) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
  setCookie(name, "", { expires: -1 });
}

export const refreshToken = (): Promise<IRefreshTokenResponse> => {
  return request(`${API.authBaseUrl}${API.authEndpoints.refreshToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const res = await request<T>(url, options);
    return res;
  } catch (err: unknown) {
    if ((err as TTokenError).message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken.split("Bearer ")[1]);
      const headers: Record<string, string> = {
        "Content-type": "application/json",
      };
      headers.authorization = refreshData.accessToken;
      const res = await request<T>(url, options);
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};
