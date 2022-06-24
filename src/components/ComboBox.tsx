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
// export interface CategoryGroupedOption{
//   label: string;
//   options: CategoryOptions[];
// }

export interface Options {
  id: string;
  value: string;
}

// export const chakraStyles: ChakraStylesConfig = {
//   control: (provided, state) => ({
//     ...provided,
//     padding: "0",
//   }),
//   dropdownIndicator: (provided, state) => ({
//     ...provided,
//     background: state.isFocused ? "pink.600" : "pink.500",

//     _hover: {
//       background: "pink.600",
//     },
//     transitionDelay: "200ms",
//     colorScheme: "pink",
//     marginTop: "auto",
//     border: "0",
//   }),
//   downChevron: (provided, state) => ({
//     ...provided,
//     background: state.isFocused ? "pink.600" : "pink.500",
//   }),
//   menuList: (provided, state) => ({
//     ...provided,
//     background: "gray.900",
//     color: "gray.50",
//     border: "1px",
//     borderColor: "pink.500",
//     borderRadius: "8px",
//     overflow: "hidden",
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     background: "gray.900",
//     color: "gray.50",
//     borderRadius: "8px",
//     _hover: {
//       background: "gray.800",
//     },
//   }),
//   groupHeading: (provided, state) => ({
//     ...provided,
//     background: "gray.900",
//     color: "gray.50",
//   }),
// };

interface ComboBoxProps extends SelectProps {
  name: string;
  placeHolder?: string;
  comboboxData: Options[] | undefined;
  error?: FieldError | undefined;
  value: string;
  onChange: (newValue: any) => void;
}

const comboBox: ForwardRefRenderFunction<HTMLSelectElement, ComboBoxProps> = (
  { name, onChange, value, placeHolder, comboboxData, error = null, ...rest },
  ref
) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<RiArrowDownLine />}
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
        //padding={"4"}
        height={"3rem"}
        bg={"gray.800"}
        color="gray.50"
        w="100%"
        // ref={ref}
        // {...rest}
      >
        {comboboxData?.find((x) => x.id === value)?.value ||
          placeHolder ||
          "Selecione uma Opção..."}
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
                onClick={() => onChange(data.id)}
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
