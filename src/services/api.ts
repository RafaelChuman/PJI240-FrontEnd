import axios, { Axios, AxiosError, AxiosInstance } from "axios";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { SignOut, TokenError } from "./hooks/useAuthentication";

let isRefreshing = false;
let failedRequestQueue: {
  onSuccess: (token: string) => void;
  onFailure: (error: Axios) => void;
}[] = [];


export function setupAPIClient(context?: GetServerSidePropsContext) {
  let cookies = parseCookies(context);

  const api: AxiosInstance = axios.create({
    //baseURL: "http://pji240.herokuapp.com/",
    baseURL: "http://127.0.0.1:3333/",
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

        SignOut(context);

      }
      return Promise.reject(error);
    }
  );

  return api;
}

export const api = setupAPIClient();
