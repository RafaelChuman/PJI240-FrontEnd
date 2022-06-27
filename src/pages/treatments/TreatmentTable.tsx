import { Table, Thead, Tr, Th, Td, Checkbox, Tbody } from "@chakra-ui/react";
import { TreatmentGroupedByTreatmentId } from "../../services/hooks/useTreatments";
import { TreatmentTableLine } from "./TreatmentTableLine";


interface TreatmentTableProps {
  treatmentData: TreatmentGroupedByTreatmentId[] | undefined;
  isWideVersion: boolean | undefined;
}

export function TreatmentTable({ treatmentData, isWideVersion }: TreatmentTableProps) {
  return (
    <Table colorScheme={"whiteAlpha"}>
      <Thead>
        <Tr>
          <Th px={["4", "4", "6"]} color={"gray.300"} width="8">
            <Checkbox colorScheme={"pink"}></Checkbox>
          </Th>
          <Th>Cliente</Th>
          <Th>Tratamentos</Th>
          <Th>Produtos</Th>
          <Th>Valor</Th>          
          <Th width={"8"}> </Th>
        </Tr>
      </Thead>
      <Tbody>
        {treatmentData ? (
          treatmentData.map((treatment) => {
            return (
              <TreatmentTableLine
                key={treatment.id}
                treatment={treatment}
                isWideVersion={isWideVersion}
              />
            );
          })
        ) : (
          <TreatmentTableLine treatment={undefined}  isWideVersion={false} />
        )}
      </Tbody>
    </Table>
  );
}
