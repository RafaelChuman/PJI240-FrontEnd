import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { SideBar } from "../../components/SideBar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { ComboBox, Options } from "../../components/ComboBox";
import { useEffect, useState } from "react";
import { FormatDataToCombobox } from "../../services/utils";
import { getUsers } from "../../services/hooks/useUsers";
import { Treatment } from "../../services/hooks/useTreatments";
import { getProducts } from "../../services/hooks/useProducts";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import { CreateTreatmentTable } from "../../components/treatments/CreateTreatmentTable";

const TreatmentCreatFormSchema = yup.object().shape({
  usersId: yup.string(),
});

export interface addProductItem {
  productsId: string;
  quantityOfProduct: string;
  quantityOfProductPerDay: string;
}

export default function CreateTreatment() {
  const router = useRouter();
  const [treatmenstId, setTreatmentsId] = useState("");
  const [usersValue, setUsersValue] = useState<Options[]>();
  const [usersComboBoxValue, setUsersComboBoxValue] = useState("");
  const [productsValue, setProductsValue] = useState<Options[]>();
  const [quantityOfProduct, setQuantityOfProduct] = useState("");
  const [quantityOfProductPerDay, setQuantityOfProductPerDay] = useState("");
  const [productsComboBoxValue, setProductsComboBoxValue] = useState("");
  const [listOfProductsToAdd, setListOfProductsToAdd] = useState<
    addProductItem[]
  >([]);

  useEffect(() => {

    setTreatmentsId(uuidv4());

    getUsers().then((resp) => {
      const users = FormatDataToCombobox(resp);

      setUsersValue(users);
    });

    getProducts().then((resp) => {
      const products = FormatDataToCombobox(resp);

      setProductsValue(products);
    });
  }, []);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const creatTreatment = useMutation(
    async (treatment: Treatment) => {
      const response = 
        await api.post("treatments", {
          treatmentsId: treatmenstId,
          usersId: treatment.usersId,
          products: listOfProductsToAdd 
      });
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Treatments");
    
      },
    }
  );

  const { register, handleSubmit, formState } = useForm<Treatment>({
    resolver: yupResolver(TreatmentCreatFormSchema),
  });

  const handleaddProductTratment = async(e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const p: addProductItem = {
      productsId: productsComboBoxValue,
      quantityOfProduct: quantityOfProduct,
      quantityOfProductPerDay: quantityOfProductPerDay,
    };

    const newProductArray = [...listOfProductsToAdd, p];
    setListOfProductsToAdd(newProductArray);
  };

  const handleCreateTreatment: SubmitHandler<Treatment> = async (values) => {
    if (!values.productsId) values.productsId = productsComboBoxValue;
    if (!values.usersId) values.usersId = usersComboBoxValue;

    await creatTreatment.mutateAsync(values);
    router.push("/treatments");
  };

  return (
    <Box>
      <Header></Header>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Flex w="100%" display={"inline"}>
        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateTreatment)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight={"normal"}>
            {" "}
            Criar Tratamento
          </Heading>
          <Divider my="6" borderColor={"gray.700"} />
          <VStack spacing={"8"}>
            <SimpleGrid
              minChildWidth={"240px"}
              spacing={["6", "8"]}
              w="100%"
              alignItems={"end"}
            >
              <ComboBox
                value={usersComboBoxValue}
                handleClick={(newValue) => {
                  setUsersComboBoxValue(newValue);
                }}
                comboboxData={usersValue}
                placeHolder="Selecione o Cliente"
                error={formState.errors.usersId}
                {...register("usersId")}
              ></ComboBox>
              <Input
                error={formState.errors.treatmentsId}
                visibility="hidden"
                value={treatmenstId}
                {...register("treatmentsId")}

              ></Input>
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify={"flex-end"}>
            <HStack spacing={"4"}>
              <Link href={"/products"} passHref>
                <Button colorScheme={"whiteAlpha"}>Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme={"pink"}
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
        <Box as="form"
        
          flex={"2"} 
          borderRadius={8} 
          bg="gray.800" 
          p={["6", "8"]}>
          <VStack spacing={"8"}>
            <SimpleGrid
              minChildWidth={"240px"}
              spacing={["6", "8"]}
              w="100%"
              alignItems={"end"}
            >
              <Input
                name="quantityOfProduct"
                label="Quantidade do Produto"
                error={formState.errors.quantityOfProduct}
                onChange={(e) => setQuantityOfProduct(e.currentTarget.value)}
              ></Input>
              <Input
                name="quantityOfProductPerDay"
                label="Quantidade do Produto Por Dia"
                onChange={(e) =>
                  setQuantityOfProductPerDay(e.currentTarget.value)
                }
                error={formState.errors.quantityOfProductPerDay}
              ></Input>
            </SimpleGrid>
          </VStack>
          <VStack spacing={"8"}>
            <SimpleGrid
              minChildWidth={"240px"}
              spacing={["6", "8"]}
              w="100%"
              alignItems={"end"}
            >
              <ComboBox
                value={productsComboBoxValue}
                handleClick={(newValue) => {
                  setProductsComboBoxValue(newValue);
                }}
                comboboxData={productsValue}
                placeHolder="Selecione o Produto"
                error={formState.errors.productsId}
                {...register("productsId")}
              ></ComboBox>
              <Button
                type="submit"
                colorScheme={"pink"}
                isLoading={formState.isSubmitting}
                onClick={(e)=>handleaddProductTratment(e)} 
              >
                Adicionar
              </Button>
            </SimpleGrid>
          </VStack>
        </Box>
        <Box flex={"2"} borderRadius={8} bg="gray.800" p={["6", "8"]}>
        <Flex>
          <CreateTreatmentTable
            products={productsValue}
            productsToAdd={listOfProductsToAdd}
            isWideVersion={isWideVersion}
          />
        </Flex>
        </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
