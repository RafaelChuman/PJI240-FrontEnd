import { Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { addProductItem } from "./create";
import { CreateTreatmentTableLine } from "./CreatTreatmentTableLine";


interface CreateTreatmentTableProps {
  products: addProductItem[] | undefined;
  isWideVersion: boolean | undefined;
}

export function CreateTreatmentTable({ products, isWideVersion }: CreateTreatmentTableProps) {
  return (
    <Table colorScheme={"whiteAlpha"}>
      <Thead>
        <Tr>
          <Th>Produto</Th>
          <Th>Quantidade do Produto</Th>
          <Th>Quantidade do Produto por Dia</Th>       
          <Th width={"8"}> </Th>
        </Tr>
      </Thead>
      <Tbody>
        {products ? (
          products.map((product) => {
            return (
              <CreateTreatmentTableLine
                key={product.productsId}
                product={product}
                isWideVersion={isWideVersion}
              />
            );
          })
        ) : (
          <CreateTreatmentTableLine product={undefined}  isWideVersion={false} />
        )}
      </Tbody>
    </Table>
  );
}
