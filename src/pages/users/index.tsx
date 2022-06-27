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
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/SideBar";
import { UserTable } from "./UserTable";
import { User, useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { returnPaginatedData } from "../../services/utils";

const numberOfItensPerPage = 10;

export default function UserList() {
  const { data, isLoading, isFetching, error, refetch } = useUsers();
  //const [users, setUsers] = useState<User[]>([]);

  const [userCurrentPage, setUserCurrentPage] = useState(1);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const users = returnPaginatedData<User>(
    data,
    userCurrentPage,
    numberOfItensPerPage
  );



  return (
    <Box>
      <Header></Header>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align={"center"}>
            <Heading size="lg" fontWeight={"normal"}>
              Usuários
              {!isLoading && isFetching && (
                <Spinner size={"sm"} color="gray.500" ml={4} />
              )}
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
            users && (
              <>
                <UserTable userData={users} isWideVersion={isWideVersion} />

                <Pagination
                  totalCountOfRegisters={users.length}
                  currentPage={userCurrentPage}
                  registersPerPage={numberOfItensPerPage}
                  onPageClick={setUserCurrentPage}
                ></Pagination>
              </>
            )
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
