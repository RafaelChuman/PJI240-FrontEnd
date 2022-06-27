import { useQuery } from "react-query";
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

export function groupByTreatmentId(
  data: Treatment[] | undefined
): TreatmentGroupedByTreatmentId[] {
  let dataFormated: TreatmentGroupedByTreatmentId[] = [];
  const key: string = "treatmentsId";

  if(!data) return [];
  
  data.forEach((itemTreatment) => {
    const hasTreatmentId = dataFormated.findIndex(
      (item) => item.treatmentsId === itemTreatment.treatmentsId
    );

    if (hasTreatmentId > 0) {
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

export function useTreatments() {
  return useQuery("treatments", getTreatments, {
    staleTime: 1000 * 30, //30 Seconds
  });
}
