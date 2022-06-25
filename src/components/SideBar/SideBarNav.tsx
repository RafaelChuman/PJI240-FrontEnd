import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiHealthBookLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink href="/dashboard" icon={RiDashboardLine} children="Dashboard" />
        <NavLink href="/users" icon={RiContactsLine} children="Usuários" />
      </NavSection>
      <NavSection title="Administração">
        <Stack spacing="4" mt="8" align="stretch">
          <NavLink href="/categories" icon={RiInputMethodLine} children="Categorias" />
          <NavLink href="/products" icon={RiGitMergeLine} children="Produtos" />
          <NavLink href="/treatments" icon={RiHealthBookLine} children="Tratamentos" />
        </Stack>
      </NavSection>
    </Stack>
  );
};
