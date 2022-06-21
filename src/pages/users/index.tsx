import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/SideBar";
import { UserTable } from "./UserTable";
import { useQuery } from "react-query";

export default function UserList() {
  const { data, isLoading, error } = useQuery("users", async () => {
    console.log("********************")
    const response = await fetch('http://localhost:3333/users');
    
    const resp = await response.json();
    
    console.log(resp)
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header></Header>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align={"center"}>
            <Heading size="lg" fontWeight={"normal"}>
              {" "}
              Usuários
            </Heading>
            <Link href={"/users/create"} passHref>
              <Button
                as="a"
                size="sm"
                fontSize={"sm"}
                colorScheme="pink"
                // leftIcon={}
              >
                <Icon as={RiAddLine} fontSize="28" />
                Criar novo Usuário
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
             <Flex justify={"center"}>
               <Text>Falha ao Obter Dados dos Usuários</Text>
             </Flex>
          ) : (
            <>
              <UserTable isWideVersion={isWideVersion} />

              <Pagination></Pagination>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
