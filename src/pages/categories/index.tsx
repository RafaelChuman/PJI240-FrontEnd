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
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/SideBar";
import { getPaginatedData } from "../../services/api";
import { Category, useCategories } from "../../services/hooks/useCategories";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { CategoryTable } from "./CategoryTable";

const numberOfItensPerPage = 10;

export default function UserList() {
  const { data, isLoading, isFetching, error, refetch } = useCategories();

  const [userCurrentPage, setUserCurrentPage] = useState(1);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const categories = getPaginatedData<Category>(
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
              Categorias
              {!isLoading && isFetching && (
                <Spinner size={"sm"} color="gray.500" ml={4} />
              )}
            </Heading>
            <Link href={"/categories/create"} passHref>
              <Button
                as="a"
                size="sm"
                fontSize={"sm"}
                colorScheme="pink"
              >
                <Icon as={RiAddLine} fontSize="28" />
                Criar nova Categoria
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
            categories && (
              <>
                <CategoryTable categoryData={categories} isWideVersion={isWideVersion} />

                <Pagination
                  totalCountOfRegisters={categories.length}
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

export const getServerSideProps = withSSRAuth(async (context) => {
  return {
    props: {},
  };
});
