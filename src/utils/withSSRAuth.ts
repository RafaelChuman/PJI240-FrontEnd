import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";
import { api } from "../services/api";

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const { "pji240.token": token } = parseCookies(context);
    const { "pji240.userName": userName } = parseCookies(context);

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      await api.get(`users/?userName=${userName}`);

      
    } catch (errror) {
      
    }
    return await fn(context);
  };
}
