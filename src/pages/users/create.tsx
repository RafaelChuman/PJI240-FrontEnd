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

type CreatUserFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const signInFormSchema = yup.object().shape({
  name: yup.string().required("Nome Obrigatório."),
  email: yup.string().required("E-mail Obrigatório.").email("E-mail Inválido."),
  password: yup
    .string()
    .required("Senha Obrigatória.")
    .min(6, "No mínimo 6 caracteres"),
  passwordConfirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm<CreatUserFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreatUserFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
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
                {...register('name')}
              ></Input>
              <Input
                label="email"
                error={formState.errors.email}
                {...register('email')}
              ></Input>
            </SimpleGrid>
            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">
              <Input
                type="password"
                label="Senha"
                error={formState.errors.password}
                {...register('password')}
              ></Input>
              <Input
                type="password"
                label="Confirmação da Senha"
                error={formState.errors.passwordConfirmation}
                {...register("passwordConfirmation")}
              ></Input>
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify={"flex-end"}>
            <HStack spacing={"4"}>
              <Link href={"/users"} passHref>
                <Button colorScheme={"whiteAlpha"}>Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme={"pink"}
              isLoading={formState.isSubmitting}
              >Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
