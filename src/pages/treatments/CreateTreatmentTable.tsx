import { Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { Options } from "../../components/ComboBox";
import { addProductItem } from "./create";
import { CreateTreatmentTableLine } from "./CreatTreatmentTableLine";


interface CreateTreatmentTableProps {
  products: Options[] | undefined;
  productsToAdd: addProductItem[] | undefined;
  isWideVersion: boolean | undefined;
}

export function CreateTreatmentTable({ products, productsToAdd, isWideVersion }: CreateTreatmentTableProps) {
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
        {productsToAdd ? (
          productsToAdd.map((product) => {
            return (
              <CreateTreatmentTableLine
                key={product.productsId}
                productName={products?.find((item) => item.id === product.productsId)?.value}
                product={product}
                isWideVersion={isWideVersion}
              />
            );
          })
        ) : (
          <CreateTreatmentTableLine productName={undefined} product={undefined}  isWideVersion={false} />
        )}
      </Tbody>
    </Table>
  );
}
