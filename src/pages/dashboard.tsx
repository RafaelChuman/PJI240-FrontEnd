import { Box, Flex,  SimpleGrid,  Text,  theme,} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useContext } from "react";
import { AuthContext } from "../services/hooks/useAuthentication";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2021-03-18T00:00:00.000Z",
      "2021-03-19T00:00:00.000Z",
      "2021-03-20T00:00:00.000Z",
      "2021-03-21T00:00:00.000Z",
      "2021-03-22T00:00:00.000Z",
      "2021-03-23T00:00:00.000Z",
      "2021-03-24T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  {
    name: "Series1",
    data: [32, 120, 10, 28, 51, 18, 109],
  },
];

export default function Dashboard() {

  const {userToken} = useContext(AuthContext);

  return (
    <Flex direction={"column"} h="100vh">
        <Text>{userToken?.token}</Text>
      <Header></Header>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems={"flex-start"}
        >
          <Box padding={["6","8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize={"large"} mb="4">
              Incritos da Semana
            </Text>
            <Chart type="area" height={160} options={options} series={series} />
          </Box>
          <Box padding={["6","8"]}  bg="gray.800" borderRadius={8}>
            <Text fontSize={"large"} mb="4">
              Taxa de Abertura
            </Text>
            <Chart type="area" height={160} options={options} series={series} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}