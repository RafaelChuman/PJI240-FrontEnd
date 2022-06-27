import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
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
import { Category } from "../../services/hooks/useCategories";
import { useRouter } from "next/router";



const categoryCreatFormSchema = yup.object().shape({
  name: yup.string().required("Nome Obrigatório."),
});

export default function CreateCategory() {
  const router = useRouter();

  const creatUser = useMutation(
    async (category: Category) => {
      const response = await api.post("categories", {
        name: category.name
      });

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );

  const { register, handleSubmit, formState } = useForm<Category>({
    resolver: yupResolver(categoryCreatFormSchema),
  });

  const handleCreateCategory: SubmitHandler<Category> = async (values) => {
    await creatUser.mutateAsync(values);
    router.push("/categories");
  };

  return (
    <Box>
      <Header></Header>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateCategory)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight={"normal"}>
            {" "}
            Criar Categoria
          </Heading>
          <Divider my="6" borderColor={"gray.700"} />
          <VStack spacing={"8"}>
            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">
              <Input
                label="Nome Categoria"
                error={formState.errors.name}
                {...register("name")}
              ></Input>
            </SimpleGrid>
            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">              
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify={"flex-end"}>
            <HStack spacing={"4"}>
              <Link href={"/categories"} passHref>
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
      </Flex>
    </Box>
  );
}
