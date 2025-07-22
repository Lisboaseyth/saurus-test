import React from "react";
import { PaginationProps } from "./interface";
import { Button, HStack, Text } from "@chakra-ui/react";

export const Pagination = ({
  handleChangePage,
  isLoading,
  pagination,
}: PaginationProps) => {
  const [clickedPage, setClickedPage] = React.useState<number>(1);
  const generatePageButtons = () => {
    if (pagination.totalPages <= 6) {
      return Array.from({ length: pagination.totalPages }, (_, i) => i + 1);
    }

    const startPages = [1, 2, 3];
    const endPages = [
      pagination.totalPages - 2,
      pagination.totalPages - 1,
      pagination.totalPages,
    ];
    const middlePages = [];

    const startMiddlePage = Math.max(4, pagination.pageIndex - 3);
    const endMiddlePage = Math.min(
      pagination.totalPages - 3,
      pagination.pageIndex + 3
    );
    for (let i = startMiddlePage; i <= endMiddlePage; i++) {
      if (i !== 1 && i !== pagination.totalPages) {
        middlePages.push(i);
      }
    }

    const allPages = [...startPages, ...middlePages, ...endPages];

    const result: (number | string)[] = [];

    for (let i = 0; i < allPages.length; i++) {
      result.push(allPages[i]);
      if (i < allPages.length - 1 && allPages[i + 1] - allPages[i] > 1) {
        result.push("...");
      }
    }

    return result;
  };

  const pageButtons = generatePageButtons();

  return (
    <HStack spacing={2} marginX={"12px"}>
      {pageButtons.map((page, index) =>
        typeof page === "string" ? (
          <Text
            key={`ellipsis-${index}`}
            color={"rgba(102, 112, 133, 1)"}
            fontSize={"sm"}
            w={"36px"}
            textAlign={"center"}
          >
            ...
          </Text>
        ) : (
          <Button
            key={`button-${index}`}
            isDisabled={page === pagination.pageIndex || isLoading}
            isLoading={isLoading && clickedPage === page}
            variant={"pagination"}
            w={"36px"}
            onClick={() => {
              setClickedPage(page);
              handleChangePage(page);
            }}
          >
            {page}
          </Button>
        )
      )}
    </HStack>
  );
};
