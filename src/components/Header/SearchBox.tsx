import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function Searchbox() {
  
const [search, setSearch] = useState('');

const searInputRef = useRef<HTMLInputElement>(null);

console.log(searInputRef.current?.value);

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color={"gray.200"}
      bg={"gray.800"}
      position="relative"
      borderRadius={"full"}
    >
      <Input
        color={"gray.50"}
        variant="unstyled"
        placeholder="Buscar na Plataforma"
        _placeholder={{ color: "gray.400" }}
        px="4"
        mr="4"
        ref = {searInputRef}
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
