import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
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
        size={"md"}
        name="Chuman"
        src="http://github.com/rafaelChuman.png"
      ></Avatar>
    </Flex>
  );
}
