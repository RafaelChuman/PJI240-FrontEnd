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
import { useState } from "react";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { Product, useProducts } from "../../services/hooks/useProducts";
import { ProductTable } from "../../components/products/ProductTable";
import { returnPaginatedData } from "../../services/utils";


const numberOfItensPerPage = 10;

export default function ProductList() {
  const { data, isLoading, isFetching, error } = useProducts();

  const [productCurrentPage, setProductCurrentPage] = useState(1);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const products = returnPaginatedData<Product>(
    data,
    productCurrentPage,
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
              Produtos
              {!isLoading && isFetching && (
                <Spinner size={"sm"} color="gray.500" ml={4} />
              )}
            </Heading>
            <Link href={"/products/create"} passHref>
              <Button
                as="a"
                size="sm"
                fontSize={"sm"}
                colorScheme="pink"
              >
                <Icon as={RiAddLine} fontSize="28" />
                Criar novo Produto
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify={"center"}>
              <Text>Falha ao Obter Dados dos Produtos</Text>
            </Flex>
          ) : (
            products && (
              <>
                <ProductTable productData={products} isWideVersion={isWideVersion} />

                <Pagination
                  totalCountOfRegisters={products.length}
                  currentPage={productCurrentPage}
                  registersPerPage={numberOfItensPerPage}
                  onPageClick={setProductCurrentPage}
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
