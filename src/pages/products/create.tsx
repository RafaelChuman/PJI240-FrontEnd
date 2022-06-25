import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Select,
  VStack,
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
import { useRouter } from "next/router";
import {
  Product,
  ProductUnitGroupedOptions,
  ProductUnitOptions,
} from "../../services/hooks/useProducts";
import {
  getCategories,
} from "../../services/hooks/useCategories";
import { ComboBox, Options } from "../../components/ComboBox";
import { useEffect, useState } from "react";
import { FormatDataToCombobox } from "../../services/utils";

const ProductCreatFormSchema = yup.object().shape({
  name: yup.string().required("Nome Obrigatório."),
  categoriesId: yup.string(),
  numberStocke: yup.string().required("Quantidade em Estoque Obrigatória."),
  image: yup.string(),
  quantityValue: yup.string().required("Quantidade Obrigatória."),
  quantityUnit: yup.string(),
  value: yup.string().required("Valor Obrigatório."),
});

export default function CreateProduct() {
  const router = useRouter();
  const [categoriesFormatedData, setCategoriesFormatedData] =
    useState<Options[]>();
  const [categoryValue, setCategoryValue] = useState("");
  const [unitValue, setUnitValue] = useState<"ml" | "l" | "g" | "Kg" | "und">("ml");

  useEffect(() => {
    getCategories().then((resp) => {
      const categories = FormatDataToCombobox(resp);

      setCategoriesFormatedData(categories);
    });
  }, []);

  const creatProduct = useMutation(
    async (product: Product) => {
      const response = await api.post("products", {
        categoriesId: product.categoriesId,
        name: product.name,
        numberStocke: product.numberStocke,
        image: product.image,
        quantityValue: product.quantityValue,
        quantityUnit: product.quantityUnit,
        value: product.value,
      });

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );

  const { register, handleSubmit, formState } = useForm<Product>({
    resolver: yupResolver(ProductCreatFormSchema),
  });

  const handleCreateProduct: SubmitHandler<Product> = async (values) => {
    
    if(!values.categoriesId)values.categoriesId = categoryValue;
    if(!values.quantityUnit)values.quantityUnit = unitValue;

    console.log(values)

    await creatProduct.mutateAsync(values);
    router.push("/products");
  };

  return (
    <Box>
      <Header></Header>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateProduct)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight={"normal"}>
            {" "}
            Criar Produto
          </Heading>
          <Divider my="6" borderColor={"gray.700"} />
          <VStack spacing={"8"}>
            <SimpleGrid
              minChildWidth={"240px"}
              spacing={["6", "8"]}
              w="100%"
              alignItems={"end"}
            >
              <Input
                label="Nome Produto"
                error={formState.errors.name}
                {...register("name")}
              ></Input>
              <ComboBox
                value={categoryValue}
                handleClick={(newValue) => {
                   setCategoryValue(newValue);
                }}
                comboboxData={categoriesFormatedData}
                placeHolder="Selecione a Categoria"
                error={formState.errors.categoriesId}
                {...register("categoriesId")}
              ></ComboBox>
            </SimpleGrid>
          </VStack>
          <VStack spacing={"8"}>
            <SimpleGrid
              minChildWidth={"240px"}
              spacing={["6", "8"]}
              w="100%"
              alignItems={"end"}
            >
              <Input
                label="Imagem"
                error={formState.errors.image}
                {...register("image")}
              ></Input>
              <Input
                label="Valor"
                error={formState.errors.value}
                {...register("value")}
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
              <Input
                label="Quantidade do Produto"
                error={formState.errors.quantityValue}
                {...register("quantityValue")}
              ></Input>
              <ComboBox
                value={unitValue}
                handleClick={(newValue) => {
                  setUnitValue(newValue);
                }}
                comboboxData={ProductUnitOptions}
                placeHolder="Selecione a Unidade de Medida"
                error={formState.errors.quantityUnit}
                {...register("quantityUnit")}
              ></ComboBox>
            </SimpleGrid>
          </VStack>
          <VStack spacing={"8"}>
            <SimpleGrid
              minChildWidth={"240px"}
              spacing={["6", "8"]}
              w="100%"
              alignItems={"end"}
            >
              <Input
                label="Estoque do Produto"
                error={formState.errors.numberStocke}
                {...register("numberStocke")}
              ></Input>
              <Input
              name="disable"
              visibility={"hidden"}
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
                //onClick={handleSubmit(handleCreateProduct)}
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
