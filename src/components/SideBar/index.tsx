import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { userSideBarDrawer } from "../../contents/SideBarDrawerContext";
import { SideBarNav } from "./SideBarNav";

export function SideBar() {
const {isOpen, onClose}= userSideBarDrawer();

  const isfrawerSideBar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isfrawerSideBar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6"></DrawerCloseButton>
            <DrawerHeader>Navegação</DrawerHeader>ks
            <DrawerBody>
              <SideBarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
  return (
    <Box as="aside" w="64" mr="8">
      <SideBarNav />
    </Box>
  );
}
