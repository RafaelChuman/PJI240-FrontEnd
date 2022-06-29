import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { SignOut} from "../../services/hooks/useAuthentication";
interface ProfileProps {
  showProfileData?: boolean;
  userName: string;
  name:string;
}



export function Profile({ showProfileData = true, userName, name }: ProfileProps) {
  function HandleSignOut(){
    SignOut();
  }

  return (
    <Flex align={"center"} ml="auto">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{userName}</Text>
          <Text color={"gray.300"} fontSize="small">
            {name}
          </Text>
        </Box>
      )}
      <Avatar
        onClick={HandleSignOut}
        size={"md"}
        name={userName}
        title="Logout"
        _hover={{
          filter:'grayscale(100%)'
        }}
        transition="filter 1000ms linear"
        src="http://github.com/rafaelChuman.png"
      ></Avatar>
    </Flex>
  );
}
