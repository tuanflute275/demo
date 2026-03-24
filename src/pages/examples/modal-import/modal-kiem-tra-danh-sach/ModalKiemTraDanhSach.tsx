// import React, { useState } from 'react';
// import { Modal, Button, Table } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
// import type { TableColumnsType, UploadFile } from 'antd';
// import { toast } from 'react-toastify';
// import { API_ENDPOINTS } from '@/api/constants';
// import { useLoading } from '@/shared/hook/useLoading';
// import classNames from 'classnames/bind';
// import styles from './ModalKiemTraDanhSach.module.scss';
// import { apiPost } from '@/api';

// const cx = classNames.bind(styles);

// interface ExcelRowData {
//     key: string;
//     maHoSo: string;
//     hovaTen: string;
//     ngaySinh: string;
//     gioiTinh: number;
//     soDinhdanh: string;
//     ngayCap: string;
//     noiCap: string;
//     maDantoc: string;
//     maTongiao: string;
//     ns_MaQuocgia: string;
//     ns_MaTinh: string;
//     ns_MaXa: string;
//     ns_Diachi: string;
//     qq_MaTinh: string;
//     qq_MaXa: string;
//     ndktt_MaTinh: string;
//     ndktt_MaXa: string;
//     ndktt_Diachi: string;
//     tt_MaTinh: string;
//     tt_MaXa: string;
//     tt_Diachi: string;
//     noHT_MaTinh: string;
//     noHT_MaXa: string;
//     noHT_Diachi: string;
//     ngh_Sodinhdanh: string;
//     ngh_Hovaten: string;
//     ngh_Ngaysinh: string;
//     ngh_Gioitinh: number;
//     ngh_Sodienthoai: string;
//     ngh_MoiQuanHe: string;
//     trangThai: string;
//     ketQuaKiemTra: string;
// }

// interface ModalKiemTraDanhSachProps {
//     open: boolean;
//     onCancel: () => void;
//     onSuccess: () => void;
//     data: ExcelRowData[];
//     file?: UploadFile;
// }

// const ModalKiemTraDanhSach: React.FC<ModalKiemTraDanhSachProps> = ({
//     open,
//     onCancel,
//     onSuccess,
//     data,
//     file
// }) => {
//     const { showLoading, hideLoading } = useLoading();
//     const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//     const [uploading, setUploading] = useState(false);

//     // Cấu hình cột cho bảng kết quả
//     const columns: TableColumnsType<ExcelRowData> = [
//         {
//             title: () => (
//                 <input
//                     type="checkbox"
//                     checked={isAllSelected}
//                     ref={(input) => {
//                         if (input) input.indeterminate = isIndeterminate;
//                     }}
//                     onChange={(e) => handleSelectAll(e.target.checked)}
//                 />
//             ),
//             dataIndex: 'select',
//             width: '2%',
//             render: (_, record) => (
//                 <input
//                     type="checkbox"
//                     checked={selectedRowKeys.includes(record.key)}
//                     onChange={(e) => {
//                         if (e.target.checked) {
//                             setSelectedRowKeys([...selectedRowKeys, record.key]);
//                         } else {
//                             setSelectedRowKeys(selectedRowKeys.filter(key => key !== record.key));
//                         }
//                     }}
//                 />
//             ),
//         },
//         { title: 'Mã hồ sơ', dataIndex: 'maHoSo', width: 120, fixed: 'left' },
//         { title: 'Họ và tên', dataIndex: 'hovaTen', width: 150 },
//         { title: 'Ngày sinh', dataIndex: 'ngaySinh', width: 100 },
//         { title: 'Giới tính', dataIndex: 'gioiTinh', width: 80, render: (value: number) => value === 1 ? 'Nam' : value === 2 ? 'Nữ' : '' },
//         { title: 'Số định danh', dataIndex: 'soDinhdanh', width: 120 },
//         { title: 'Ngày cấp', dataIndex: 'ngayCap', width: 100 },
//         { title: 'Nơi cấp', dataIndex: 'noiCap', width: 120 },
//         { title: 'Dân tộc', dataIndex: 'maDantoc', width: 100 },
//         { title: 'Tôn giáo', dataIndex: 'maTongiao', width: 100 },
//         { title: 'Nơi sinh - Quốc gia', dataIndex: 'ns_MaQuocgia', width: 120 },
//         { title: 'Nơi sinh - Tỉnh', dataIndex: 'ns_MaTinh', width: 120 },
//         { title: 'Nơi sinh - Xã', dataIndex: 'ns_MaXa', width: 120 },
//         { title: 'Nơi sinh - Địa chỉ', dataIndex: 'ns_Diachi', width: 150 },
//         { title: 'Nguyên quán - Tỉnh', dataIndex: 'qq_MaTinh', width: 120 },
//         { title: 'Nguyên quán - Xã', dataIndex: 'qq_MaXa', width: 120 },
//         { title: 'Thường trú - Tỉnh', dataIndex: 'ndktt_MaTinh', width: 120 },
//         { title: 'Thường trú - Xã', dataIndex: 'ndktt_MaXa', width: 120 },
//         { title: 'Thường trú - Địa chỉ', dataIndex: 'ndktt_Diachi', width: 150 },
//         { title: 'Tạm trú - Tỉnh', dataIndex: 'tt_MaTinh', width: 120 },
//         { title: 'Tạm trú - Xã', dataIndex: 'tt_MaXa', width: 120 },
//         { title: 'Tạm trú - Địa chỉ', dataIndex: 'tt_Diachi', width: 150 },
//         { title: 'Hiện tại - Tỉnh', dataIndex: 'noHT_MaTinh', width: 120 },
//         { title: 'Hiện tại - Xã', dataIndex: 'noHT_MaXa', width: 120 },
//         { title: 'Hiện tại - Địa chỉ', dataIndex: 'noHT_Diachi', width: 150 },
//         { title: 'NGH - Số định danh', dataIndex: 'ngh_Sodinhdanh', width: 120 },
//         { title: 'NGH - Họ tên', dataIndex: 'ngh_Hovaten', width: 150 },
//         { title: 'NGH - Ngày sinh', dataIndex: 'ngh_Ngaysinh', width: 100 },
//         { title: 'NGH - Giới tính', dataIndex: 'ngh_Gioitinh', width: 80, render: (value: number) => value === 1 ? 'Nam' : value === 2 ? 'Nữ' : '' },
//         { title: 'NGH - SĐT', dataIndex: 'ngh_Sodienthoai', width: 120 },
//         { title: 'NGH - Mối quan hệ', dataIndex: 'ngh_MoiQuanHe', width: 120 },
//         {
//             title: 'Trạng thái',
//             dataIndex: 'trangThai',
//             width: '15%',
//             render: (trangThai: string | number) => renderTrangThaiHoSo(trangThai),
//         },
//         {
//             title: 'Kết quả kiểm tra',
//             dataIndex: 'ketQuaKiemTra',
//             width: '15%',
//         },
//     ];

//     const renderTrangThaiHoSo = (trangThai: string | number) => {
//         const trangThaiValue =
//             typeof trangThai === "string" ? parseInt(trangThai) : trangThai;

//         let className = "global-status-blue";
//         let label = "Không xác định";

//         // switch (trangThaiValue) {
//         //     case TTXL_HOSO_TRANG_THAI_VALUE.TAO_MOI:
//         //         className = "global-status-green";
//         //         label = "Thêm mới";
//         //         break;
//         //     case TTXL_HOSO_TRANG_THAI_VALUE.CHO_XAC_NHAN:
//         //         className = "global-status-yellow";
//         //         label = "Chờ xác nhận";
//         //         break;
//         //     case TTXL_HOSO_TRANG_THAI_VALUE.DA_XAC_NHAN:
//         //         className = "global-status-blue";
//         //         label = "Đã xác nhận";
//         //         break;
//         //     case TTXL_HOSO_TRANG_THAI_VALUE.DANG_CAP_NHAT:
//         //         className = "global-status-green";
//         //         label = "Chờ bổ sung";
//         //         break;
//         //     case TTXL_HOSO_TRANG_THAI_VALUE.DA_BI_TU_CHOI:
//         //         className = "global-status-red";
//         //         label = "Đã bị từ chối";
//         //         break;
//         //     default:
//         //         // Fallback cho trường hợp là string
//         //         if (typeof trangThai === "string") {
//         //             label = trangThai;
//         //             className = "global-status-blue";
//         //         }
//         //         break;
//         // }

//         return <span className={className}>{label}</span>;
//     };

//     const handleSelectAll = (checked: boolean) => {
//         if (checked) {
//             setSelectedRowKeys(data.map(item => item.key));
//         } else {
//             setSelectedRowKeys([]);
//         }
//     };

//     const isAllSelected = selectedRowKeys.length === data.length && data.length > 0;
//     const isIndeterminate = selectedRowKeys.length > 0 && selectedRowKeys.length < data.length;

//     const handleActualImport = async () => {
//         if (!file) {
//             toast.error('Không tìm thấy file để import');
//             return;
//         }

//         try {
//             setUploading(true);
//             showLoading();

//             const formData = new FormData();
//             formData.append('file', file as any);
//             // Có thể thêm thông tin về các dòng được chọn nếu API hỗ trợ

//             // const response = await apiPost(API_ENDPOINTS.HO_SO_NGUOI_KHUYET_TAT.IMPORT, formData, {
//             //     headers: {
//             //         'Content-Type': 'multipart/form-data',
//             //     },
//             // });

//             // if (response.succeeded) {
//             //     onSuccess();
//             // } else {
//             //     toast.error(response.errors || 'Import dữ liệu thất bại');
//             // }
//         } catch (error: any) {
//             console.error('Error importing:', error);
//             const errorMessage = error?.response?.data?.message || error?.message || 'Có lỗi xảy ra khi import dữ liệu';
//             toast.error(errorMessage);
//         } finally {
//             setUploading(false);
//             hideLoading();
//         }
//     };

//     return (
//         <Modal
//             title="Kết quả kiểm tra danh sách hồ sơ"
//             open={open}
//             onCancel={onCancel}
//             width={1600}
//             className={cx('modal')}
//             maskClosable={false}
//             destroyOnClose
//             footer={[
//                 <Button
//                     key="confirm"
//                     type="primary"
//                     onClick={handleActualImport}
//                     loading={uploading}
//                     disabled={selectedRowKeys.length === 0}
//                     className={cx('confirmButton')}
//                 >
//                     Xác nhận import
//                 </Button>,
//                 <Button
//                     key="cancel"
//                     icon={<FontAwesomeIcon icon={faCircleXmark} />}
//                     onClick={onCancel}
//                 >
//                     Hủy
//                 </Button>
//             ]}
//         >
//             <div className={cx('content')}>

//                 <Table
//                     columns={columns}
//                     dataSource={data}
//                     pagination={false}
//                     scroll={{ y: 400, x: 4000 }}
//                     size="small"
//                     className={cx('resultTable')}
//                     loading={uploading}
//                 />
//             </div>
//         </Modal>
//     );
// };

// export default ModalKiemTraDanhSach;