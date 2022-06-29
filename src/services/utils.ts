import { number, string } from "yup";
import { dataOfChart } from "../components/Charts";
import { Options } from "../components/ComboBox";

interface dataToComboBox {
  id?: string;
  name: string;
}

interface dataToChart {
  count: number;
  date_trunc: Date;
}

export function FormatDataToCharts(allData: dataToChart[]): dataOfChart {
  if (allData) {
    let categories: string[] = [];
    let series: number[] = [];

    allData.forEach((data) => {
      categories.push(String(data.date_trunc));
      series.push(data.count);
    });

    if (categories.length && series.length) {
      return {
        categories: categories,
        series: series,
      };
    }
  }
  return {
    categories: [""],
    series: [0],
  };
}

export function FormatDataToCombobox(allData: dataToComboBox[]): Options[] {
  if (allData) {
    const formatedData = allData.map((data) => {
      return {
        id: data.id ? data.id : "",
        value: data.name,
      };
    });

    return formatedData;
  }
  return [
    {
      id: "",
      value: "",
    },
  ];
}

export function convertToBRL(value: string | undefined)
{
  let valor = 0

  if(value === undefined || value===""){
    valor = 0
  }
  else
  {
    valor = parseInt(value);
  }

  const valueFormated = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor/100);

  return valueFormated;
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
  const endPage = startPage + (perPage );

  return schema.slice(startPage, endPage);
}
