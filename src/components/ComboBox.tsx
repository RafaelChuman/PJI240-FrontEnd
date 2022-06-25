import React, { forwardRef, ForwardRefRenderFunction } from "react";
import {
  background,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  SelectField,
  SelectProps,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

import styles from "./combobox.module.css";
import { RiArrowDownLine, RiCheckLine } from "react-icons/ri";

export interface Options {
  id: string;
  value: string;
}

interface ComboBoxProps extends SelectProps {
  name: string;
  placeHolder?: string;
  comboboxData: Options[] | undefined;
  error?: FieldError | undefined;
  value: string;
  handleClick: (newValue: any) => void;
}

const comboBox: ForwardRefRenderFunction<HTMLSelectElement, ComboBoxProps> = (
  { name, handleClick, value, placeHolder, comboboxData, error = null, ...rest },
  ref
) => {
  return (
    <Menu>
      <MenuButton
        as={Select}
        border={"1px"}
        borderColor={"pink.500"}
        borderRadius="8px"
        _hover={{
          background: "gray.800",
          color: "gray.200",
        }}
        _active={{
          background: "gray.800",
          color: "gray.200",
        }}
        placeholder={comboboxData?.find((x) => x.id === value)?.value ||
          placeHolder ||
          "Selecione uma Opção..."}
        height={"3rem"}
        bg={"gray.800"}
        color="gray.50"
        w="100%"
      >
        
      </MenuButton>
      <MenuList
        w="100%"
        minWidth={"400px"}
        alignContent="center"
        alignItems={"center"}
        background={"gray.600"}
        backgroundColor={"gray.600"}
        border={"1px"}
        borderColor={"pink.500"}
      >
        {comboboxData ? (
          comboboxData.map((data) => {
            return (
              <MenuItem
                width={"100%"}
                background={"gray.600"}
                backgroundColor={"gray.600"}
                color="gray.50"
                _hover={{
                  color: "gray.200",
                }}
                _focus={{
                  color: "gray.200",
                }}
                onClick={() => handleClick(data.id)}
                key={data.id}
                icon={<RiCheckLine opacity={value === data.id ? 1 : 0} />}
              >
                {data.value}
              </MenuItem>
            );
          })
        ) : (
          <></>
        )}
      </MenuList>
    </Menu>
  );
};

export const ComboBox = forwardRef(comboBox);
