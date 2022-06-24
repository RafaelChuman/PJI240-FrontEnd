import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { SideBarDrawerProvider } from "../contents/SideBarDrawerContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "../services/queryClient";
import { AuthProvider } from "../services/hooks/useAuthentication";



const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <SideBarDrawerProvider>
            <Component {...pageProps} />
          </SideBarDrawerProvider>
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
    </>
  );
};

export default App;
