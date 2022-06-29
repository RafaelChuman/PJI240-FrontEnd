import { Td, Tr, Text, Box, Button, Icon } from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";
import { TreatmentGroupedByTreatmentId } from "../../services/hooks/useTreatments";
import { convertToBRL } from "../../services/utils";

interface TableLineProps {
  treatment: TreatmentGroupedByTreatmentId | undefined;
  isWideVersion: boolean | undefined;
}

export function TreatmentTableLine({
  treatment,
  isWideVersion = true,
}: TableLineProps) {
  if (!treatment || !treatment.products.length) {
    return <></>;
  }

  return (
    <Tr>
      <Td px={["4", "4", "6"]}>
        <Text fontWeight="bold">{treatment.treatmentsId}</Text>
      </Td>
      <Td>
        <Box>
          <Text fontWeight="bold">{treatment.users?.name}</Text>
          <Text fontWeight="bold">{treatment.users?.whatsApp}</Text>
        </Box>
      </Td>
      <Td>
        <Box>
          {treatment.products.map((data) => {
            return (
              <>
                <Text key={`'Tratamentos${treatment.id}''`} fontWeight="bold">
                  {data.quantityOfProductPerDay} {data.product?.quantityUnit}{" "}
                  Por Dia
                </Text>
                <Text fontWeight="bold"> &nbsp;</Text>
              </>
            );
          })}
        </Box>
      </Td>

      <Td>
        <Box>
          {treatment.products.map((data) => {
            return (
              <>
                <Text key={`'Produtos${treatment.id}''`} fontWeight="bold">
                  {data.product?.name}
                </Text>
                <Text fontWeight="bold" color={"gray.300"}>
                  {data.product?.quantityValue} {data.product?.quantityUnit}
                </Text>
              </>
            );
          })}
        </Box>
      </Td>
      <Td>
        <Box>
          {treatment.products.map((data) => {
            return (
              <>
                <Text key={`'Valor${treatment.id}''`} fontWeight="bold">
                  {convertToBRL( data.product?.value)}
                </Text>
                <Text fontWeight="bold"> &nbsp;</Text>
              </>
            );
          })}
        </Box>
      </Td>
      <Td>
        <Button
          size="sm"
          fontSize={"sm"}
          colorScheme="purple"
          p={!isWideVersion ? "0" : "3"}
          margin="0"
        >
          <Icon as={RiPencilLine} fontSize="16" />
          {isWideVersion && <p>&nbsp; Editar</p>}
        </Button>
      </Td>
    </Tr>
  );
}
