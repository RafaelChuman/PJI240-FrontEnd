import { QueryFunctionContext, useQuery } from "react-query";
import { api } from "../api";
import { Product } from "./useProducts";
import { User } from "./useUsers";

export interface Treatment {
  id: string;
  treatmentsId: string;
  usersId: string;
  productsId: string;
  quantityOfProduct: number;
  quantityOfProductPerDay: number;
  products?: Product;
  users?: User;
  createdAt?: Date;
  isValid?: boolean;
}

export interface TreatmentGroupedByTreatmentId {
  id: string;
  treatmentsId: string;
  isValid?: boolean;

  users: User | undefined;

  products: {
    product: Product | undefined;
    quantityOfProduct: number;
    quantityOfProductPerDay: number;
    createdAt?: Date;
  }[];
}

export interface TreatmentsGroupedByData {
  count: number;
  date_trunc: Date;
}

export async function getTreatmentsByMonth(): Promise<TreatmentsGroupedByData[]> {
  const { data } = await api.get(`treatments/?groupByMonth=True`);

  const formatedData = data.map((treatment: TreatmentsGroupedByData) => {
    return {
      count: treatment.count,
      date_trunc: new Date(treatment.date_trunc).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }),
    };
  });
  return formatedData;
}

export function groupByTreatmentId(
  data: Treatment[] | undefined
): TreatmentGroupedByTreatmentId[] {
  let dataFormated: TreatmentGroupedByTreatmentId[] = [];


  if(!data) return [];
  
  data.forEach((itemTreatment) => {
    const hasTreatmentId = dataFormated.findIndex(
      (item) => item.treatmentsId === itemTreatment.treatmentsId
    );

    if (hasTreatmentId > -1) {
      dataFormated[hasTreatmentId].products.push({
        product:                  itemTreatment.products,
        quantityOfProduct:        itemTreatment.quantityOfProduct,
        quantityOfProductPerDay:  itemTreatment.quantityOfProductPerDay,
        createdAt:                itemTreatment.createdAt,
      });
    } else {
      dataFormated.push({
        id:           itemTreatment.id,
        treatmentsId: itemTreatment.treatmentsId,
        isValid:      itemTreatment.isValid,

        users:         itemTreatment.users,

        products: [
          {
            product:                  itemTreatment.products,
            quantityOfProduct:        itemTreatment.quantityOfProduct,
            quantityOfProductPerDay:  itemTreatment.quantityOfProductPerDay,
            createdAt:                itemTreatment.createdAt,
          },
        ],
      });
    }    
  });

  return dataFormated;
}

export async function getTreatments(): Promise<Treatment[]> {
  const { data } = await api.get("treatments");

  const formatedData = data.map((treatment: Treatment) => {
    return {
      id: treatment.id,
      treatmentsId: treatment.treatmentsId,
      uersId: treatment.usersId,
      productsId: treatment.productsId,
      quantityOfProduct: treatment.quantityOfProduct,
      quantityOfProductPerDay: treatment.quantityOfProductPerDay,
      products: treatment.products,
      users: treatment.users,
      createdAt: treatment.createdAt,
      isValid: treatment.isValid,
    };
  });
  return formatedData;
}

export async function getTreatmentsProductsToBuy(dateOfSearch:Date): Promise<Treatment[]> {
  const treatmentsProductsToBuy = await api.get(`treatments/?dateOfNewTreatment=${dateOfSearch}`);

  const formatedData = treatmentsProductsToBuy.data.map((treatment: Treatment) => {
    return {
      id: treatment.id,
      treatmentsId: treatment.treatmentsId,
      uersId: treatment.usersId,
      productsId: treatment.productsId,
      quantityOfProduct: treatment.quantityOfProduct,
      quantityOfProductPerDay: treatment.quantityOfProductPerDay,
      products: treatment.products,
      users: treatment.users,
      createdAt: treatment.createdAt,
      isValid: treatment.isValid,
    };
  });
  return formatedData;
}

export function useTreatments() {
  return useQuery("Treatments", getTreatments, {
    staleTime: 1000 * 30, //30 Seconds
  });
}

export function useTreatmentsByMonth() {
  return useQuery("TreatmentsByMonth", getTreatmentsByMonth, {
    staleTime: 1000 * 30, //30 Seconds
  });
}

export function useTreatmentsProductsToBuy(dateOfSearch: Date) {
  return useQuery(["TreatmentsProductsToBuy"], ()=> getTreatmentsProductsToBuy(dateOfSearch), {
    staleTime: 1000 * 30, //30 Seconds
  });
} 
