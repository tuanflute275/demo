import React from 'react';
import { Modal, Button, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './ModalConfirm.module.scss';
import { faFloppyDisk, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

export interface ModalConfirmProps {
  visible: boolean;
  title: string;
  content: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
  confirmText?: string;
  cancelText?: string;
  confirmButtonType?: 'primary' | 'default';
  confirmButtonDanger?: boolean;
  showIcon?: boolean;
  zIndex?: number;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  visible,
  title,
  content,
  onCancel,
  onConfirm,
  loading = false,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  confirmButtonType = 'primary',
  confirmButtonDanger = false,
  zIndex = 1000,
//   showIcon = true,
}) => {
  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      width={500}
      className={cx('modal-confirm')}
      zIndex={zIndex}
      footer={
        <Space>
            <Button 
            type={confirmButtonType}
            danger={confirmButtonDanger}
            onClick={onConfirm}
            loading={loading}
            icon={<FontAwesomeIcon icon={faFloppyDisk} />}
          >
            {confirmText}
          </Button>
          <Button icon={<FontAwesomeIcon icon={faXmarkCircle} />} onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>
        </Space>
      }
    >
      <div className={cx('modal-content')}>
        <div className={cx('content-text')}>
          {content}
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;