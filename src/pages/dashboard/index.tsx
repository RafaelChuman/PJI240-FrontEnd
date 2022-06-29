import {
  Box,
  Flex,
  SimpleGrid,
  Spinner,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { Charts, dataOfChart } from "../../components/Charts";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { useUsersByMonth } from "../../services/hooks/useUsers";
import { FormatDataToCharts, returnPaginatedData } from "../../services/utils";
import { useState } from "react";
import {
  groupByTreatmentId,
  TreatmentGroupedByTreatmentId,
  useTreatmentsByMonth,
  useTreatmentsProductsToBuy,
} from "../../services/hooks/useTreatments";
import { TreatmentTable } from "../../components/treatments/TreatmentTable";
import { Pagination } from "../../components/Pagination";

export default function Dashboard() {
  const today = new Date();
  const numberOfItensPerPage = 10;

  const [treatmentCurrentPage, setTreatmentCurrentPage] = useState(1);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const usersData = useUsersByMonth();
  let usersChartData: dataOfChart = { categories: [""], series: [0] };

  const treatmentsdata = useTreatmentsByMonth();
  let treatmentsChartData: dataOfChart = { categories: [""], series: [0] };

  const treatmentsWithoutPagination = useTreatmentsProductsToBuy(today);

  const treatmentsDataFormated = groupByTreatmentId(
    treatmentsWithoutPagination.data
  );

  const treatments = returnPaginatedData<TreatmentGroupedByTreatmentId>(
    treatmentsDataFormated,
    treatmentCurrentPage,
    numberOfItensPerPage
  );

  if (usersData.data) {
    usersChartData = FormatDataToCharts(usersData.data);
  }

  if (treatmentsdata.data) {
    treatmentsChartData = FormatDataToCharts(treatmentsdata.data);
  }

  return (
    <Box>
      <Header></Header>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        {treatmentsWithoutPagination.isLoading || usersData.isLoading ? (
          <Spinner />
        ) : treatmentsWithoutPagination.error || usersData.error ? (
          <Flex justify={"center"}>
            <Text>Falha ao Obter Dados</Text>
          </Flex>
        ) : (
          <Flex
            w="100%"
            my="6"
            flexDirection={"column"}
            gap="4"
            mx="auto"
            px="6"
          >
            <SimpleGrid
              flex="1"
              gap="4"
              minChildWidth="320px"
              alignItems={"flex-start"}
            >
              <Box padding={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
                {treatmentsChartData && (
                  <Charts
                    dataOfChart={treatmentsChartData}
                    labelOfChart="Número de Tratamentos Neste Mês"
                  ></Charts>
                )}
              </Box>
              <Box padding={["6", "8"]} bg="gray.800" borderRadius={8}>
                {usersChartData && (
                  <Charts
                    dataOfChart={usersChartData}
                    labelOfChart="Novos Clientes Neste Mês"
                  ></Charts>
                )}
              </Box>
            </SimpleGrid>

            <Box padding={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
              {treatments && (
                <>
                  <TreatmentTable
                    treatmentData={treatments}
                    isWideVersion={isWideVersion}
                  />

                  <Pagination
                    totalCountOfRegisters={treatments.length}
                    currentPage={treatmentCurrentPage}
                    registersPerPage={numberOfItensPerPage}
                    onPageClick={setTreatmentCurrentPage}
                  ></Pagination>
                </>
              )}
            </Box>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
