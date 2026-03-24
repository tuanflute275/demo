export interface PaginationQuery {
  pageIndex?: number;
  pageSize?: number;
}

export interface PaginationResponse<T> {
  items: T[];
  total: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface DanhMucDungChung {
  value: number | string;
  label: string;
  parentValue?: number | string;
  children?: DanhMucDungChung[];
  disabled?: boolean;
}