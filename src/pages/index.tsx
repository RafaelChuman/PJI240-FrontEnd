import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Input } from "../components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import {
  useAuthenticate,
  useAuthenticateMutation,
  UserAuthCredentials,
} from "../services/hooks/useAuthentication";
import { json } from "stream/consumers";
import { stringify } from "querystring";
import { useState } from "react";
import { AxiosError } from "axios";

const sigInFormSchema = yup.object().shape({
  userName: yup.string().required("Usuário Obrigatório."),
  password: yup.string().required("Senha Obrigatória."),
});

const Home = () => {
  const router = useRouter();
  const [errorLogin, setErrorLogin] = useState("");
  const getTokenMutation = useAuthenticateMutation();

  const { register, handleSubmit, formState } = useForm<UserAuthCredentials>({
    resolver: yupResolver(sigInFormSchema),
  });

  const handleSignIn: SubmitHandler<UserAuthCredentials> = async (
    values,
    event
  ) => {
    const response = await getTokenMutation.mutateAsync(values);

    console.log(response);

    if (response.tokenError != undefined) {
      const mesage = response.tokenError.response?.data.message;
      if (mesage != undefined) {
        setErrorLogin(mesage.toString());
      }
    } 
    if (response.token!= undefined) {       
      setErrorLogin(response.token.data.token);
    } //router.push("/dashboard");
  };

  return (
    <Flex w="100vw" h="720px" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Text align={"center"} justifyContent="center" color={"red.300"}>
          {errorLogin}
        </Text>
        <Stack spacing={4}>
          <Input
            label="Usuário"
            type="text"
            error={formState.errors.userName}
            {...register("userName")}
          ></Input>
          <Input
            label="Senha"
            type="password"
            error={formState.errors.password}
            {...register("password")}
          ></Input>
        </Stack>
        <Button
          type="submit"
          mt={6}
          colorScheme="pink"
          size={"lg"}
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;
