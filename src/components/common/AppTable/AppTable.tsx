import { Table } from 'antd';
import type { TableProps, PaginationProps } from 'antd';
import classNames from 'classnames/bind';
import styles from './AppTable.module.scss';
import { useNumberFormat } from '@/shared/hook/useNumberFormat';

const cx = classNames.bind(styles);

interface AppTableProps<T extends Record<string, unknown> = Record<string, unknown>> extends Omit<TableProps<T>, 'pagination'> {
  showPagination?: boolean;
  paginationConfig?: PaginationProps | false;
  onPaginationChange?: (page: number, pageSize: number) => void;
  currentPage?: number;
  currentPageSize?: number;
  total?: number;
  rowKey?: TableProps<T>['rowKey']; // Tường minh hóa rowKey prop
}

const AppTable = <T extends Record<string, unknown> = Record<string, unknown>>({
  showPagination = true,
  paginationConfig,
  onPaginationChange,
  currentPage = 1,
  currentPageSize = 10,
  total,
  className,
  rowKey = 'key', // Default rowKey là 'key'
  ...tableProps
}: AppTableProps<T>) => {
  const { formatNumber } = useNumberFormat();
  const defaultPagination: PaginationProps = {
    current: currentPage,
    pageSize: currentPageSize,
    total: total || 0,
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: (total, range) => 
      `Hiển thị ${formatNumber(range[0], { decimals: 0 })}-${formatNumber(range[1], { decimals: 0 })} trong tổng số ${formatNumber(total, { decimals: 0 })} bản ghi`,
    pageSizeOptions: ['10', '20', '50', '100'],
    size: 'default',
    onChange: (page: number, pageSize: number) => {
      onPaginationChange?.(page, pageSize);
    },
    onShowSizeChange: (_current: number, size: number) => {
      onPaginationChange?.(1, size); // Reset to page 1 when changing page size
    },
    itemRender: (current, type, originalElement) => {
      if (type === 'page') {
        return <span>{formatNumber(current, { decimals: 0 })}</span>;
      }
      return originalElement;
    },
  };




  const finalPagination = showPagination 
    ? { ...defaultPagination, ...paginationConfig }
    : false;

  return (
    <Table
      {...tableProps}
      rowKey={rowKey}
      className={cx('appTable', className)}
      pagination={finalPagination}
      scroll={{ x: 'max-content', y: 60 * 10 }}
      size="middle"
    />
  );
};

export default AppTable;