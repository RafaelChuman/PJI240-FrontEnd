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
import { useRouter } from "next/router";

type UserCreatFormData = {
  cellphone:      string,
  cep:            string,
  name:           string,
  numberAddress:  string,
  whatsApp:       string,
};

const UserCreateFormSchema = yup.object().shape({
  name: yup.string().required("Nome Obrigatório."),
  whatsApp: yup.string().required("whatsApp Obrigatório."),
  cellphone: yup.string().required("Celular Obrigatório."),
  cep: yup.string().required("CEP Obrigatório."),
  numberAddress: yup.string().required("Número Residência Obrigatório."),
});

export default function CreateUser() {
  const router = useRouter();

  const creatUser = useMutation(
    async (user: UserCreatFormData) => {
      const response = await api.post("users", {
        'name' : user.name ,
        'whatsApp':user.whatsApp,
        'cellphone':user.cellphone,
        'cep':user.cep,
        'numberAddress':user.numberAddress
      });

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const { register, handleSubmit, formState } = useForm<UserCreatFormData>({
    resolver: yupResolver(UserCreateFormSchema),
  });

  const handleCreateUser: SubmitHandler<UserCreatFormData> = async (values) => {
    await creatUser.mutateAsync(values);
    router.push("/users");
  };

  return (
    <Box>
      <Header></Header>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight={"normal"}>
            {" "}
            Criar Usuário
          </Heading>
          <Divider my="6" borderColor={"gray.700"} />
          <VStack spacing={"8"}>
            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">
              <Input
                label="Nome Completo"
                error={formState.errors.name}
                {...register("name")}
              ></Input>
              
            </SimpleGrid>
            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">
            <Input
                label="Whatsapp"
                error={formState.errors.whatsApp}
                {...register("whatsApp")}
              ></Input>
              <Input
                label="Celular"
                error={formState.errors.cellphone}
                {...register("cellphone")}
              ></Input>
            </SimpleGrid>
            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">              
              <Input
                label="CEP"
                error={formState.errors.cep}
                {...register("cep")}                
              ></Input>
              <Input
                label="Número Residência"
                error={formState.errors.numberAddress}
                {...register("numberAddress")}                
              ></Input>
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify={"flex-end"}>
            <HStack spacing={"4"}>
              <Link href={"/users"} passHref>
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
