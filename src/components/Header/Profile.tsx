import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext, SignOut} from "../../services/hooks/useAuthentication";
interface ProfileProps {
  showProfileData?: boolean;
}




export function Profile({ showProfileData = true }: ProfileProps) {
  function HandleSignOut(){
    SignOut();
  }

  return (
    <Flex align={"center"} ml="auto">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Rafael Chuman</Text>
          <Text color={"gray.300"} fontSize="small">
            rafael.chuman@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        onClick={HandleSignOut}
        size={"md"}
        name="Chuman"
        src="http://github.com/rafaelChuman.png"
      ></Avatar>
    </Flex>
  );
}
