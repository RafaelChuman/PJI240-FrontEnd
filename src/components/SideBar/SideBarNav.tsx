import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiHealthBookLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink href="/dashboard" icon={RiDashboardLine} navComponent="Dashboard" />
        <NavLink href="/users" icon={RiContactsLine} navComponent="Usuários" />
      </NavSection>
      <NavSection title="Administração">
        <Stack spacing="4" mt="8" align="stretch">
          <NavLink href="/categories" icon={RiInputMethodLine} navComponent="Categorias" />
          <NavLink href="/products" icon={RiGitMergeLine} navComponent="Produtos" />
          <NavLink href="/treatments" icon={RiHealthBookLine} navComponent="Tratamentos" />
        </Stack>
      </NavSection>
    </Stack>
  );
};
