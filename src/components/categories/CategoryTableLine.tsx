import { Td, Tr, Checkbox, Text, Box, Button, Icon } from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";
import { Category } from "../../services/hooks/useCategories";

interface TableLineProps{
    category:Category|undefined;
    isWideVersion:boolean|undefined;
};

export function CategoryTableLine({category , isWideVersion = true}: TableLineProps) {
  if (!category)
  {
    return <></>; 
  }

  return (
    <Tr>
      <Td px={["4", "4", "6"]}>
        <Checkbox colorScheme={"pink"}></Checkbox>
      </Td>
      <Td>
        <Box>
          <Text fontWeight="bold">{category.name}</Text>
          </Box>
      </Td>
      {isWideVersion && <Td>{category.createdAt}</Td>}
      <Td>
        <Button
          size="sm"
          fontSize={"sm"}
          colorScheme="purple"
          p={!isWideVersion ? "0" : "3"}
          margin= "0"
        >          
          <Icon as={RiPencilLine} fontSize="16" />
        { isWideVersion &&  <p>&nbsp; Editar</p>} 
        </Button>
      </Td>
    </Tr>
  );
}
