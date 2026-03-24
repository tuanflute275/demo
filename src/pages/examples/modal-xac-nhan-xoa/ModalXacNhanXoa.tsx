// import React from 'react';
// import { Modal, Button, Space } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import classNames from 'classnames/bind';
// import styles from './ModalXacNhanXoa.module.scss';
// import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';

// const cx = classNames.bind(styles);

// export interface ModalXacNhanXoaProps {
//   visible: boolean;
//   onCancel: () => void;
//   onConfirm: () => void;
//   hoSoData?: {
//     maHoSo?: string;
//     hoVaTen?: string;
//     ngaySinh?: string;
//     ngayDeNghiGiamDinhYKhoa?: string;
//     gioiTinh?: string;
//     soDDCN?: string;
//   };
//   loading?: boolean;
// }

// const ModalXacNhanXoa: React.FC<ModalXacNhanXoaProps> = ({
//   visible,
//   onCancel,
//   onConfirm,
//   hoSoData,
//   loading = false
// }) => {
//   return (
//     <Modal
//       title="Xác nhận xoá thông tin hỗ trợ việc làm"
//       open={visible}
//       onCancel={onCancel}
//       width={500}
//       className={cx('modal-xac-nhan-xoa')}
//       footer={
//         <Space style={{ display: 'flex', justifyContent: 'center' }}>
//           <Button 
//             type="primary"
//             icon={<FontAwesomeIcon icon={faTrash} />}
//             onClick={onConfirm}
//             loading={loading}
//             style={{ minWidth: '80px' }}
//             className='red-btn'
//           >
//             Xóa
//           </Button>
//           <Button 
//             icon={<FontAwesomeIcon icon={faXmarkCircle} />} 
//             onClick={onCancel}
//             style={{ minWidth: '80px' }}
//           >
//             Hủy
//           </Button>
//         </Space>
//       }
//       centered
//     >
//       <div className={cx('modal-content')}>
//         <div> Bạn có muốn xoá thông tin hỗ trợ việc làm không?</div>
//         <div style={{display: 'none'}}>có mã hồ sơ: {hoSoData?.maHoSo || 'N/A'} không?</div>
//       </div>
//     </Modal>
//   );
// };

// export default ModalXacNhanXoa;