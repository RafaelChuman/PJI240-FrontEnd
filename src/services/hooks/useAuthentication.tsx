import { AxiosError, AxiosResponse } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { api } from "../api";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { User } from "./useUsers";
import { GetServerSidePropsContext, NextPageContext } from "next";
import { deserialize } from "v8";

export interface TokenError {
  message: string;
}

export interface Token {
  user: UserAuthCredentials;
  token: string;
}

export interface AuthResponse {
  token: AxiosResponse<Token> | void;
  tokenError: AxiosError<TokenError> | void;
}

type AuthContextData = {
  SignIn(credentials: UserAuthCredentials): Promise<AuthResponse>;
  isAuthenticated: boolean;
  userToken: Token | undefined;
};

export interface UserAuthCredentials {
  userName: string;
}

export interface UserSignInCredentials {
  userName: string;
  password: string;
}

//let authChanel :BroadcastChannel;

export function SignOut(context?: GetServerSidePropsContext) {
  destroyCookie(context, "pji240.token");
  destroyCookie(context, "pji240.userName");

  //authChanel.postMessage("signOut");

  if (process.browser) {
    Router.push("/");
  }
}

export async function getToken({
  userName,
  password,
}: UserSignInCredentials): Promise<AuthResponse> {
  let response: AuthResponse = {
    token: undefined,
    tokenError: undefined,
  };

  response.token = undefined;
  response.tokenError = undefined;

  const resp = await api
    .post<Token>("/", {
      userName: userName,
      password: password,
    })
    .catch((error) => {
      response.tokenError = error;
    });

  if (resp) {
    api.defaults.headers.common["authorization"] = resp.data.token;
  }

  response.token = resp;

  return response;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [userToken, setUserToken] = useState<Token>();
  const isAuthenticated = !!userToken;

  // useEffect(() => {

  //   authChanel = new BroadcastChannel("auth");
  //   authChanel.onmessage = (message) =>{
  //     switch (message.data){
  //       case 'signOut':
  //         SignOut();
  //         break;
  //       case 'signIn':
  //           Router.push('/dashboard')
  //           break;
  //       default:
  //         break;
  //     }
  //   }
  // });

  useEffect(() => {
    const { "pji240.token": token } = parseCookies();
    const { "pji240.userName": userName } = parseCookies();

    if (token) {
      api
        .get<User>(`users/?userName=${userName}`)
        .then((response) => {
          const { "pji240.token": token } = parseCookies();
          const { "pji240.userName": userName } = parseCookies();

          setUserToken({ token, user: { userName } });
        })
        .catch(() => {
          SignOut();
        });
    }
  }, []);

  async function SignIn({ userName, password }: UserSignInCredentials) {
    const response = await getToken({ userName, password });

    if (response.token) {
      setUserToken({
        token: response.token.data.token,
        user: response.token.data.user,
      });

      setCookie(undefined, "pji240.token", response.token.data.token, {
        maxAge: 60 * 60 * 24 * 38, //30 dias
        path: "/",
      });
      setCookie(
        undefined,
        "pji240.userName",
        response.token.data.user.userName,
        {
          maxAge: 60 * 60 * 24 * 38, //30 dias
          path: "/",
        }
      );

      //authChanel.postMessage('signIn');


      Router.push("/dashboard");

      
    }
    return response;
  }

  return (
    <AuthContext.Provider value={{ SignIn,  isAuthenticated, userToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthContext = createContext({} as AuthContextData);

export function useAuthenticateMutation() {
  return useMutation(getToken);
}

export function useAuthenticate(values: UserSignInCredentials) {
  return useQuery("token", () => getToken(values), {
    staleTime: 1000 * 60 * 60 * 2, //2 horas
  });
}
