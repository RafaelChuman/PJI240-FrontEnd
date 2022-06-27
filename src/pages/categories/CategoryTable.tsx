import { Table, Thead, Tr, Th, Td, Checkbox, Tbody } from "@chakra-ui/react";
import { Category } from "../../services/hooks/useCategories";
import { CategoryTableLine } from "./CategoryTableLine";

interface UserTableProps {
  categoryData: Category[] | undefined;
  isWideVersion: boolean | undefined;
}

export function CategoryTable({ categoryData, isWideVersion }: UserTableProps) {
  return (
    <Table colorScheme={"whiteAlpha"}>
      <Thead>
        <Tr>
          <Th px={["4", "4", "6"]} color={"gray.300"} width="8">
            <Checkbox colorScheme={"pink"}></Checkbox>
          </Th>
          <Th>Categoria</Th>
          {isWideVersion && <Th>Data de Cadastro</Th>}
          <Th width={"8"}> </Th>
        </Tr>
      </Thead>
      <Tbody>
        {categoryData ? (
          categoryData.map((ctg) => {
            return (
              <CategoryTableLine
                category={ctg}
                isWideVersion={isWideVersion}
              />
            );
          })
        ) : (
          <CategoryTableLine category={undefined} isWideVersion={false} />
        )}
      </Tbody>
    </Table>
  );
}
