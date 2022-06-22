import axios from 'axios';



export function getPaginatedData<Type>(schema: Type[] | undefined, page:number, perPage:number  ): Type[] | undefined {
    if (!schema){
        return undefined;
    }
   
    const length = schema.length;

    const startPage = (page-1) * perPage;
    const endPage = startPage + (perPage-1);

    return schema.slice(startPage, endPage);
}

export const api = axios.create({
    baseURL: 'http://localhost:3333/'
})