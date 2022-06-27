import { Token } from "@chakra-ui/styled-system/dist/declarations/src/utils";
import axios, { Axios, AxiosError, AxiosInstance } from "axios";
import { request } from "http";
import { GetServerSidePropsContext, NextPageContext } from "next";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { AuthTokenError } from "../errors/AuthTokenError";
import { SignOut, TokenError } from "./hooks/useAuthentication";

let isRefreshing = false;
let failedRequestQueue: {
  onSuccess: (token: string) => void;
  onFailure: (error: Axios) => void;
}[] = [];


export function setupAPIClient(context?: GetServerSidePropsContext) {
  let cookies = parseCookies(context);

  const api: AxiosInstance = axios.create({
    baseURL: "http://pji240.herokuapp.com/",
    headers: {
      authorization: cookies["pji240.token"],
    },
  });

  api.interceptors.request.use((resp) => {

    const { "pji240.token": token } = parseCookies();

    if (resp) {
      if (resp.headers) {
        
        if (token) {
          resp.headers.authorization = token;
        }
      }
    }
    return resp;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<TokenError>) => {
      if (error.response?.status === 401) {
        // if (error.response.data.message !== "Invalid Token") {
        //   cookies = parseCookies(context);

        //   const { "pji240.refreshToken": refreshToken } = cookies;

        //   const originalConfig = error.config;

        //   if (!isRefreshing) {
        //    isRefreshing = true;
        //     api
        //       .post("/refresh", { refreshToken })
        //       .then((response) => {
        //         const { token } = response.data;

        //         setCookie(context, "pji240.token", token, {
        //           maxAge: 60 * 60 * 24 * 38, //30 dias
        //           path: "/",
        //         });

        //         setCookie(
        //           context,
        //           "pji240.refreshToken",
        //           response.data.refreshToken,
        //           {
        //             maxAge: 60 * 60 * 24 * 38, //30 dias
        //             path: "/",
        //           }
        //         );

        //         api.defaults.headers.common["authorization"] = token;

        //         failedRequestQueue.forEach((request) =>
        //           request.onSuccess(token)
        //         );
        //         failedRequestQueue = [];
        //       })
        //       .catch((error) => {
        //         failedRequestQueue.forEach((request) =>
        //           request.onFailure(error)
        //         );
        //         failedRequestQueue = [];
        //       })
        //       .finally(() => {
        //         isRefreshing = false;
        //       });
        //   } else {
        //      return new Promise((resolve, reject) => {
        //       failedRequestQueue.push({
        //         onSuccess: (token: string) => {
        //           if (originalConfig && originalConfig.headers) {
        //             originalConfig.headers["authorization"] = token;

        //             resolve(api(originalConfig));
        //           }
        //         },
        //         onFailure: (error: Axios) => {
        //           reject(error);
        //         },
        //       });
        //     });

        //  } else {
        SignOut(context);

        //return Promise.reject(new AuthTokenError());
        // }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export const api = setupAPIClient();
