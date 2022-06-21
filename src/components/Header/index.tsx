import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { userSideBarDrawer } from "../../contents/SideBarDrawerContext";
import { Logo } from "./Logo";
import { Notification } from "./Notification";
import { Profile } from "./Profile";
import { Searchbox } from "./SearchBox";

export function Header() {
  const {onOpen} = userSideBarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      w="100%"
      as="header"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align={"center"}
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open Navigation"
          mr="2"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant={"unstyled"}
          onClick={onOpen}
        ></IconButton>
      )}
      <Logo />

      {isWideVersion && <Searchbox />}

      <Flex align={"center"} ml="auto">
        <Notification />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
