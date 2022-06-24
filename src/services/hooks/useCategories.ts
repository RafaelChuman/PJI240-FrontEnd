import { useQuery } from "react-query";
import { Options } from "../../components/ComboBox";
import { api } from "../api";

export interface Category {
  id: string;
  name: string;
  created_at: string;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get("categories");

  const formatedData = data.map((category: Category) => {
    return {
      id: category.id,
      name: category.name,
      created_at: new Date(category.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  return formatedData;
}

export function useCategories() {
  return useQuery("categories", getCategories, {
    staleTime: 1000 * 30, //30 Seconds
  });
}

export function FormatCategoryDataToCombobox(
  categories: Category[]
): Options[] {
  if (categories) {
    const formatedData = categories.map((category: Category) => {
      return {          
          id: category.id,
          value: category.name        
      };
    });

    
    return formatedData;
  }
  return [{          
    id: '',
    value: ''        
  }];
}
