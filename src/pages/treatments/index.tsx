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
import { groupByTreatmentId, TreatmentGroupedByTreatmentId, useTreatments } from "../../services/hooks/useTreatments";
import { returnPaginatedData } from "../../services/utils";
import { TreatmentTable } from "../../components/treatments/TreatmentTable";


const numberOfItensPerPage = 10;

export default function TreatmentList() {
  const { data, isLoading, isFetching, error, refetch } = useTreatments();

  const [treatmentCurrentPage, setTreatmentCurrentPage] = useState(1);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });


  const dataFormated =  groupByTreatmentId(data);

  const treatments = returnPaginatedData<TreatmentGroupedByTreatmentId>(
    dataFormated,
    treatmentCurrentPage,
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
              Tratamentos
              {!isLoading && isFetching && (
                <Spinner size={"sm"} color="gray.500" ml={4} />
              )}
            </Heading>
            <Link href={"/treatments/create"} passHref>
              <Button
                as="a"
                size="sm"
                fontSize={"sm"}
                colorScheme="pink"
              >
                <Icon as={RiAddLine} fontSize="28" />
                Criar novo Tratamento
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify={"center"}>
              <Text>Falha ao Obter Dados dos Tratamentos</Text>
            </Flex>
          ) : (
            treatments && (
              <>
                <TreatmentTable treatmentData={treatments} isWideVersion={isWideVersion} />

                <Pagination
                  totalCountOfRegisters={treatments.length}
                  currentPage={treatmentCurrentPage}
                  registersPerPage={numberOfItensPerPage}
                  onPageClick={setTreatmentCurrentPage}
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
