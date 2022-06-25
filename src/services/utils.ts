import { Options } from "../components/ComboBox";

interface dataToComboBox{
    id?: string;
    name: string; 
  }
  
  export function FormatDataToCombobox(
    allData: dataToComboBox[]
  ): Options[] {
    if (allData) {
      const formatedData = allData.map((data) => {
        return {          
            id: data.id ? data.id : "",
            value: data.name        
        };
      });
      
      return formatedData;
    }
    return [{          
      id: '',
      value: ''        
    }];
  }

  export function returnPaginatedData<Type>(
    schema: Type[] | undefined,
    page: number,
    perPage: number
  ): Type[] | undefined {
    if (!schema) {
      return undefined;
    }  
    const startPage = (page - 1) * perPage;
    const endPage = startPage + (perPage - 1);
  
    return schema.slice(startPage, endPage);
  }
  