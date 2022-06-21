import { Button, Flex, Stack } from "@chakra-ui/react";
import { Input } from "../components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type SignInDate = {
  email: string;
  password: string;
};

const sigInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail Obrigatório.').email('E-mail Inválido.'),
  password: yup.string().required('Senha Obrigatória.'),
});

const Home = () => {
  const { register, handleSubmit, formState } = useForm<SignInDate>({
    resolver: yupResolver(sigInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInDate> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
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
        <Stack spacing={4}>
          <Input
            label="E-mail"
            type="email"
            error={formState.errors.email}
            {...register('email')}
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
