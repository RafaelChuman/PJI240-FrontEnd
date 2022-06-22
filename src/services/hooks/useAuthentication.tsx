import { AxiosError, AxiosResponse } from "axios";
import { createContext, ReactNode } from "react";
import { useMutation, useQuery } from "react-query";
import { api } from "../api";

export interface UserAuthCredentials {
  userName: string;
  password: string;
}

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
  SignIn(credentials: UserAuthCredentials): Promise<void>;
  isAuthenticated: boolean;
};

export async function getToken({
  userName,
  password,
}: UserAuthCredentials): Promise<AuthResponse> {
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

  response.token = resp;

  return response;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps{
  children: ReactNode;
}

export function AuthProvider({ children }:AuthProviderProps) {
  const isAuthenticated = false;

  async function SignIn({ userName, password }: UserAuthCredentials) {
    console.log({ userName, password });
  }

  return (
    <AuthContext.Provider value={{ SignIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthenticateMutation() {
  return useMutation(getToken);
}

export function useAuthenticate(values: UserAuthCredentials) {
  return useQuery("token", () => getToken(values), {
    staleTime: 1000 * 60 * 60 * 2, //2 horas
  });
}
