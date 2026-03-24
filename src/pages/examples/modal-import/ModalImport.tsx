// import React, { useState, useRef } from 'react';
// import { Modal, Button, Typography } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDownload, faCircleXmark, faUpload } from '@fortawesome/free-solid-svg-icons';
// import type { UploadFile } from 'antd';
// import { toast } from 'react-toastify';
// import { apiGet, apiPost } from '@/api';
// import { API_ENDPOINTS } from '@/api/constants';
// import { useLoading } from '@/shared/hook/useLoading';
// import { downloadBase64File } from '@/shared/utils/helper';
// import classNames from 'classnames/bind';
// import styles from './ModalImport.module.scss';

// const { Title } = Typography;
// const cx = classNames.bind(styles);

// interface ModalImportProps {
//   open: boolean;
//   onCancel: () => void;
//   onSubmit: () => void;
// }

// const ModalImport: React.FC<ModalImportProps> = ({
//   open,
//   onCancel,
//   onSubmit
// }) => {
//   const { showLoading, hideLoading } = useLoading();
//   const [fileList, setFileList] = useState<UploadFile[]>([]);
//   const [importing, setImporting] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Reset state when modal closes
//   const handleCancel = () => {
//     setFileList([]);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//     onCancel();
//   };

//   // Tải file mẫu
//   const handleDownloadTemplate = async () => {
//     try {
//       showLoading();
//       const response = await apiGet(API_ENDPOINTS.HO_TRO_VIEC_LAM.DOWNLOAD_FILE_MAU);
      
//       if (response.succeeded && response.data) {
//         const base64String = response.data.fileContents || response.data;
//         const filename = response.data.fileName || 'File_Mau_Hoso.xlsx';
//         const contentType = response.data.contentType || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        
//         downloadBase64File(base64String, filename, contentType);
//       } else {
//         toast.error(response.errors || 'Không thể tải file mẫu');
//       }
//     } catch (error) {
//       toast.error('Có lỗi xảy ra khi tải file mẫu');
//     } finally {
//       hideLoading();
//     }
//   };

//   const handleImport = async () => {
//     if (fileList.length === 0) {
//       toast.error('Vui lòng chọn file Excel để import');
//       return;
//     }

//     try {
//       setImporting(true);
//       showLoading();
//       const formData = new FormData();
//       formData.append('file', fileList[0] as any);

//       const response = await apiPost(
//         API_ENDPOINTS.HO_TRO_VIEC_LAM.IMPORT,
//         formData, 
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       if (response.succeeded) {
//         toast.success(response.data || 'Import dữ liệu thành công');
//         setFileList([]);
//         if (fileInputRef.current) {
//           fileInputRef.current.value = '';
//         }
//         onSubmit();
//         setTimeout(() => {
//           handleCancel();
//         }, 2000);
//       } else {
//         toast.error(response.errors || 'Import dữ liệu thất bại');
//       }
//     } catch (error: any) {
//       const errorMessage = error?.response?.data?.message || error?.message || 'Có lỗi xảy ra khi import dữ liệu';
//       toast.error(errorMessage);
//     } finally {
//       setImporting(false);
//       hideLoading();
//     }
//   };



//   const renderFooter = () => {
//     return [
//       <Button
//         key="import"
//         type="primary"
//         icon={<FontAwesomeIcon icon={faUpload} />}
//         onClick={handleImport}
//         loading={importing}
//         disabled={fileList.length === 0}
//         className={cx(' green-btn')}
//       >
//         Xác nhận import
//       </Button>,
//       <Button
//         key="download"
//         type="primary"
//         icon={<FontAwesomeIcon icon={faDownload} />}
//         onClick={handleDownloadTemplate}
//         className={cx("green-btn")}
//       >
//         Tải file mẫu
//       </Button>,
//       <Button
//         key="cancel"
//         icon={<FontAwesomeIcon icon={faCircleXmark} />}
//         onClick={handleCancel}
//       >
//         Hủy
//       </Button>
//     ];
//   };

//   return (
//     <Modal
//       title="Import hồ sơ hỗ trợ trong lĩnh vực việc làm"
//       open={open}
//       onCancel={handleCancel}
//       footer={renderFooter()}
//       width={1000}
//       className={cx('modal')}
//       maskClosable={false}
//     >
//       <div className={cx('content')}>
//         <Title level={5}>
//           Danh sách hồ sơ hỗ trợ trong lĩnh vực việc làm
//         </Title>
        
//         <div className={cx('fileInputContainer')}>
//           <div className={cx('fileInputBox')}>
//             <input 
//               ref={fileInputRef}
//               type="file" 
//               accept=".xlsx,.xls"
//               style={{ display: 'none' }}
//               id="file-upload"
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (file) {
//                   // Kiểm tra định dạng file
//                   const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
//                   if (!isExcel) {
//                     toast.error('Chỉ hỗ trợ file Excel định dạng .xlsx hoặc .xls');
//                     return;
//                   }

//                   setFileList([file as any]);
//                 }
//               }}
//             />
//             <label htmlFor="file-upload" className={cx('uploadButton')}>
//               Chọn tệp tin
//             </label>
//             <div className={cx('fileNameArea')}>
//               {fileList.length > 0 ? fileList[0].name : ''}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ModalImport;
