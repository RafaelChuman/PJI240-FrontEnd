import { Td, Tr, Checkbox, Text, Box, Button, Icon } from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";
import { TreatmentGroupedByTreatmentId } from "../../services/hooks/useTreatments";
import { addProductItem } from "./create";

interface CreateTableLineProps {
  productName: string | undefined;
  product: addProductItem | undefined;
  isWideVersion: boolean | undefined;
}

export function CreateTreatmentTableLine({
  productName,
  product,
  isWideVersion = true,
}: CreateTableLineProps) {
  if (!product) {
    return <></>;
  }

  return (
    <Tr>
      <Td>
        <Text fontWeight="bold">{productName}</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{product.quantityOfProduct} Por Dia</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{product.quantityOfProductPerDay} Por Dia</Text>
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
