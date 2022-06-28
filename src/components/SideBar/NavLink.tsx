import {
  Icon,
  Link as ChakraLink,
  Text,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  navComponent: string;
  href: string;
}

export function NavLink({ icon, navComponent, href,...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20"></Icon>
        <Text ml="4" fontWeight="medium">
          {navComponent}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
