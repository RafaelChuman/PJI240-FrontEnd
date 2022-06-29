import { useQuery } from "react-query";
import { api } from "../api";
import { convertToBRL } from "../utils";
import { Category } from "./useCategories";

export const ProductUnitOptions = [
  { id: "ml", value: "ml" },
  { id: "l", value: "l" },
  { id: "g", value: "g" },
  { id: "Kg", value: "Kg" },
  { id: "und", value: "und" },
];

export const ProductUnitGroupedOptions = [
  {
    label: "Unidade",
    options: ProductUnitOptions
  }
];

export interface Product {
    id?:            string,
    categoriesId:   string,
    name:           string,
    numberStocke:   number,
    image:          string,
    quantityValue:  number,
    quantityUnit:   "ml" | "l" | "g" | "Kg" | "und",
    value:          string,
    category?: Category,
  }

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get("products");

  const formatedData = data.map((product: Product) => {


    return {
      id :            product.id,
      categoriesId:   product.categoriesId,
      name:           product.name,
      numberStocke:   product.numberStocke,
      image:          product.image,
      quantityValue:  product.quantityValue,
      quantityUnit:   product.quantityUnit,
      
      category:       product.category,
      value:          convertToBRL(product.value),      
    };
  });
  return formatedData;
}

export function useProducts() {
  return useQuery("products", getProducts, {
    staleTime: 1000 * 30, //30 Seconds
  });
}
