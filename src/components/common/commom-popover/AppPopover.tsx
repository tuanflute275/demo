import React from "react";
import { Popconfirm } from "antd";
import styles from "./AppPopover.module.scss";
import classNames from "classnames/bind";
import type { TooltipPlacement } from "antd/es/tooltip";

interface CommonPopoverProps {
  description: React.ReactNode;
  title?: React.ReactNode;
  trigger?: "hover" | "focus" | "click" | "contextMenu";
  triggerComponent?: React.ReactElement;
  children?: React.ReactElement;

  placement?: TooltipPlacement;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
}
const cx = classNames.bind(styles);

const CommonPopover: React.FC<CommonPopoverProps> = ({
  description,
  title,
  trigger = "click",
  triggerComponent,
  children,
  placement = "topRight",
  okText = "Xác nhận",
  cancelText = "Huỷ",
  onConfirm,
  onCancel,
  disabled = false,
}) => {
  const triggerNode = triggerComponent ?? children;

  return (
    <Popconfirm
      className={cx("common-popover")}
      description={description}
      title={title}
      trigger={trigger}
      placement={placement}
      disabled={disabled}
      okText={okText}
      cancelText={cancelText}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okButtonProps={{
        className: cx("custom-ok-button"),
      }}
      cancelButtonProps={{
        className: cx("custom-cancel-button"),
      }}
    >
      {triggerNode}
    </Popconfirm>
  );
};

export default CommonPopover;
