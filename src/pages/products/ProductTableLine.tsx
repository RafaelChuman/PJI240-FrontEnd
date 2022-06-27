import { Td, Tr, Text, Box, Button, Icon } from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";
import { Product } from "../../services/hooks/useProducts";

interface TableLineProps {
  product: Product | undefined;
  isWideVersion: boolean | undefined;
}

export function ProductTableLine({product,isWideVersion = true,}: TableLineProps) {
  if (!product)
  {
    return <></>
  }

  return (
    <Tr>
      <Td px={["4", "4", "6"]}>
        <Text fontWeight="bold">{product.category?.name}</Text>
      </Td>
      <Td>
        <Box>
          <Text fontWeight="bold">{product.name}</Text>
        </Box>
      </Td>
      {isWideVersion && <Td>{product.image}</Td>}
      <Td>
        <Box>
          <Text fontWeight="bold">{product.quantityValue}</Text>
          <Text fontWeight="bold">{product.quantityUnit}</Text>
        </Box>
      </Td>
      <Td>
        <Box>
          <Text fontWeight="bold">{product.value}</Text>
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
