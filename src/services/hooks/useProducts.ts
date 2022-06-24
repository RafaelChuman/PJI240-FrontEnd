import { useQuery } from "react-query";
import { api } from "../api";

export const ProductUnitOptions = [
  { value: "ml", label: "ml" },
  { value: "l", label: "l" },
  { value: "g", label: "g" },
  { value: "Kg", label: "Kg" },
  { value: "und", label: "und" },
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
      value:          product.value,
    };
  });
  return formatedData;
}

export function useProducts() {
  return useQuery("products", getProducts, {
    staleTime: 1000 * 30, //30 Seconds
  });
}
