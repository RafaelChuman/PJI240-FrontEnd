import { Table, Thead, Tr, Th, Td, Checkbox, Tbody } from "@chakra-ui/react";
import { TableLine } from "./UserTableLine";

interface UserTableProps{
    isWideVersion:boolean|undefined;
};

export function UserTable({isWideVersion}:UserTableProps){
return(

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
      <TableLine
        name="Rafael Chuman"
        email="Rafael.Chuman@gmail.com"
        data="19 de Junho de 2022"
        isWideVersion={isWideVersion}
      />
      <TableLine
        name="Rafael Chuman"
        email="Rafael.Chuman@gmail.com"
        data="19 de Junho de 2022"
        isWideVersion={isWideVersion}
      />
      <TableLine
        name="Rafael Chuman"
        email="Rafael.Chuman@gmail.com"
        data="19 de Junho de 2022"
        isWideVersion={isWideVersion}
      />
      <TableLine
        name="Rafael Chuman"
        email="Rafael.Chuman@gmail.com"
        data="19 de Junho de 2022"
        isWideVersion={isWideVersion}
      />
    </Tbody>
  </Table>
);

};