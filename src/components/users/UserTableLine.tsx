import { Td, Tr, Checkbox, Text, Box, Button, Icon } from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";

interface TableLineProps{
    name:string;
    email:string;
    data:string;
    isWideVersion:boolean|undefined;
};

export function TableLine({name, email, data, isWideVersion = true}: TableLineProps) {
  return (
    <Tr>
      <Td px={["4", "4", "6"]}>
        <Checkbox colorScheme={"pink"}></Checkbox>
      </Td>
      <Td>
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize={"small"} color="gray.300">
            {email}
          </Text>
        </Box>
      </Td>
      {isWideVersion && <Td>{data}</Td>}
      <Td>
        <Button
          // as="a"
          size="sm"
          fontSize={"sm"}
          colorScheme="purple"
          // leftIcon={}
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
