import { Pagination } from "@/interfaces/Pagination";

export interface PaginationProps {
  pagination: Pagination;
  handleChangePage: (page: number) => void;
  isLoading: boolean;
}
