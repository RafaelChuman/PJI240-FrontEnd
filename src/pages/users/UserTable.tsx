import { Table, Thead, Tr, Th, Td, Checkbox, Tbody } from "@chakra-ui/react";
import { User } from "../../services/hooks/useUsers";
import { TableLine } from "./UserTableLine";



interface UserTableProps {
  userData: User[] | undefined;
  isWideVersion: boolean | undefined;
}

export function UserTable({ userData, isWideVersion }: UserTableProps) {
  return (
    <Table colorScheme={"whiteAlpha"}>
      <Thead>
        <Tr>
          <Th px={["4", "4", "6"]} color={"gray.300"} width="8">
            <Checkbox colorScheme={"pink"}></Checkbox>
          </Th>
          <Th>Usuário</Th>
          {isWideVersion && <Th>Data de Cadastro</Th>}
          <Th width={"8"}> </Th>
        </Tr>
      </Thead>
      <Tbody>
        {userData ? (
          userData.map((user) => {
            return (
              <TableLine
                key={user.id}
                name={user.name}
                email={user.userName}
                data={user.created_at}
                isWideVersion={isWideVersion}
              />
            );
          })
        ) : (
          <TableLine name="" email="" data="" isWideVersion={false} />
        )}
      </Tbody>
    </Table>
  );
}
