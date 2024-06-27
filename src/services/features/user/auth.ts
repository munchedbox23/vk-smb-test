import {
  IUserLogin,
  IUserResponse,
  IUserRegister,
  IUserLogout,
  IUserResetPassword,
  IUserAuth,
  IUser,
} from "../../../types/user-types";
import { API } from "../../../utils/constants";
import {
  deleteCookie,
  fetchWithRefresh,
  getCookie,
  request,
  setCookie,
} from "../../../utils/requests";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface IProfileForm extends IUser {
  password?: string;
}

export const userLogin = createAsyncThunk<IUserResponse, IUserLogin>(
  "user/userLogin",
  async (data) => {
    const response = await request<IUserResponse>(
      `${API.authBaseUrl}${API.authEndpoints.login}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-Frame-Options": "SAMEORIGIN",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.success) {
      setCookie("accessToken", response.accessToken.split("Bearer ")[1], {
        path: "/",
      });
      setCookie("refreshToken", response.refreshToken, {
        path: "/",
      });
      return response as IUserResponse;
    } else {
      throw new Error("user login failed");
    }
  }
);

export const userRegister = createAsyncThunk<IUserResponse, IUserRegister>(
  "user/userRegister",
  async (data) => {
    const response = await request<IUserResponse>(
      `${API.authBaseUrl}${API.authEndpoints.register}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.success) {
      setCookie("accessToken", response.accessToken.split("Bearer ")[1], {
        path: "/",
      });
      setCookie("refreshToken", response.refreshToken, {
        path: "/",
      });
      return response as IUserResponse;
    } else {
      throw new Error("user register failed");
    }
  }
);

export const userLogout = createAsyncThunk("user/userLogout", async () => {
  const response = await request<IUserLogout>(
    `${API.authBaseUrl}${API.authEndpoints.logout}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    }
  );
  if (response.success) {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
  }
});

export const forgotPassword = async (data: string) => {
  const response = await request<{
    success: true;
    message: "Reset email sent";
  }>(`${API.authBaseUrl}${API.authEndpoints.forgotPassword}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email: data }),
  });

  return response;
};

export const resetPassword = async (data: IUserResetPassword) => {
  const response = await request<{
    success: true;
    message: "Password successfully reset";
  }>(`${API.authBaseUrl}${API.authEndpoints.resetPassword}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ password: data.password, token: data.token }),
  });

  if (response.success) {
    return response;
  }
};

export const checkUserAuth = createAsyncThunk<IUserAuth, undefined>(
  "user/getAuthUserData",
  async () => {
    const response = await fetchWithRefresh<IUserAuth>(
      `${API.authBaseUrl}${API.authEndpoints.userData}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + getCookie("accessToken"),
        },
      }
    );
    if (response.success) {
      return response;
    } else {
      throw new Error("User check failed");
    }
  }
);

export const editUser = createAsyncThunk<IUserAuth>(
  "user/editUserData",
  async (data) => {
    const response = await fetchWithRefresh<IUserAuth>(
      `${API.authBaseUrl}${API.authEndpoints.userData}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + getCookie("accessToken"),
        },
        body: JSON.stringify(data),
      }
    );
    if (response.success) {
      return response;
    } else {
      throw new Error("Edit user info failed");
    }
  }
);
