import { Table, Thead, Tr, Th, Td, Checkbox, Tbody } from "@chakra-ui/react";
import { Product } from "../../services/hooks/useProducts";
import { ProductTableLine } from "./ProductTableLine";




interface ProductTableProps {
  productData: Product[] | undefined;
  isWideVersion: boolean | undefined;
}

export function ProductTable({ productData, isWideVersion }: ProductTableProps) {
  return (
    <Table colorScheme={"whiteAlpha"}>
      <Thead>
        <Tr>
          <Th px={["4", "4", "6"]} color={"gray.300"} width="8">
            <Checkbox colorScheme={"pink"}></Checkbox>
          </Th>
          <Th>Produtos</Th>
          {isWideVersion && <Th></Th>}
          <Th>Tamanho</Th>
          <Th>Valor</Th>          
          <Th width={"8"}> </Th>
        </Tr>
      </Thead>
      <Tbody>
        {productData ? (
          productData.map((product) => {
            return (
              <ProductTableLine
                key={product.id}
                product={product}
                isWideVersion={isWideVersion}
              />
            );
          })
        ) : (
          <ProductTableLine product={undefined}  isWideVersion={false} />
        )}
      </Tbody>
    </Table>
  );
}
