import { Box, Button, Stack } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageClick: (page: number) => void;
}

const siblingCount = 1;

function pagesToShow(totalCountOfRegisters: number, registersPerPage: number, currentPage: number): number[]{
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const siblingsPages = 1;
  const firstPage = 1;

  const numberPagesToLastPage =
    lastPage - currentPage > siblingsPages ? siblingsPages : lastPage - currentPage;

  const numberPagesToFirstPage =
    currentPage - 1 > siblingsPages ? siblingsPages : currentPage - 1;

  let pagesGenerated = [...new Array(numberPagesToFirstPage + 1 + numberPagesToLastPage)].map(
    (_, index) => {
      return currentPage - numberPagesToFirstPage + index;
    }
  );
  
  if (pagesGenerated[0] != firstPage) {
    pagesGenerated = [firstPage, ...pagesGenerated]
  }

  if (pagesGenerated[pagesGenerated.length-1] != lastPage) {
    pagesGenerated.push(lastPage)
  }

  return pagesGenerated;
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageClick
}: PaginationProps) {

  const pages  = pagesToShow(totalCountOfRegisters, registersPerPage, currentPage);

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify={"space-between"}
      alignItems="center"
      spacing={"6"}
    >
      <Box>
        <strong> 0</strong> - <strong> 10</strong> de 100
      </Box>
      <Stack direction={"row"} spacing="2">
        {pages.map((page) => {
          if (currentPage == page) {
            return <PaginationItem key={page} isCurrent number={page} onPageClick={onPageClick}/>;
          } else {
            return <PaginationItem key={page} number={page} onPageClick={onPageClick}/>;
          }
        })}
      </Stack>
    </Stack>
  );
}
