import { Token } from "@chakra-ui/styled-system/dist/declarations/src/utils";
import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { TokenError } from "./hooks/useAuthentication";

export function getPaginatedData<Type>(
  schema: Type[] | undefined,
  page: number,
  perPage: number
): Type[] | undefined {
  if (!schema) {
    return undefined;
  }

  const length = schema.length;

  const startPage = (page - 1) * perPage;
  const endPage = startPage + (perPage - 1);

  return schema.slice(startPage, endPage);
}

let cookies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3333/",
  headers: {
    authorization: cookies["pji240.token"],
  },
});

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error: AxiosError<TokenError>) => {
//     if (error.response?.status === 401) {
//       if (error.response.data.message === "Token Expired") {
//         cookies = parseCookies();

//         const { "pji240.refreshToken": refreshToken } = cookies;

//         api
//           .post("/refresh", {
//             refreshToken,
//           })
//           .then((response) => {
//             const { token } = response.data;

//             setCookie(undefined, "pji240.token", token, {
//               maxAge: 60 * 60 * 24 * 38, //30 dias
//               path: "/",
//             });
//             setCookie(
//               undefined,
//               "pji240.refreshToken",
//               response.data.refreshToken,
//               {
//                 maxAge: 60 * 60 * 24 * 38, //30 dias
//                 path: "/",
//               }
//             );

//             api.defaults.headers.common["authorization"] = token;
//           });
//       } else {
//         //Deslogar Usuário
//       }
//     }
//     console.log(error.response?.status);
//   }
// );
