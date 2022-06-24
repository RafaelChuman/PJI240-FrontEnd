import { useQuery } from "react-query";
import { api } from "../api";

export interface User {
    id: string;
    name: string;
    userName: string;
    password: string;
    cep: string;
    numberAddress: string;
    cellphone: string;
    whatsApp: string;
    created_at: string;
    isAdmin: boolean;
  }

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get("users");

  const formatedData = data.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      userName: user.userName,
      password: user.password,
      cep: user.cep,
      numberAddress: user.numberAddress,
      cellphone: user.cellphone,
      whatsApp: user.whatsApp,
      created_at: new Date(user.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      isAdmin: user.isAdmin,
    };
  });
  return formatedData;
}

export function useUsers() {
  return useQuery("users", getUsers, {
    staleTime: 1000 * 30, //30 Seconds
  });
}
