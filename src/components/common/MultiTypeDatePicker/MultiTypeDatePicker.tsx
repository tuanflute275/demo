import React, { useState, useEffect } from "react";
import { Select, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import classNames from "classnames/bind";
import styles from "./MultiTypeDatePicker.module.scss";

const { Option } = Select;
const cx = classNames.bind(styles);

export type DateFormat = "day" | "month" | "year";

export interface MultiTypeDatePickerProps
  extends Omit<DatePickerProps, "picker" | "format"> {
  value?: Dayjs | null;
  onChange?: (value: Dayjs | null) => void;
  onFormatChange?: (format: DateFormat) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  className?: string;
  defaultFormat?: DateFormat;
  initialFormat?: DateFormat; // Format khởi tạo từ API data
  disableCustom?: boolean;
}

const MultiTypeDatePicker: React.FC<MultiTypeDatePickerProps> = ({
  value,
  onChange,
  onFormatChange,
  placeholder = "Chọn ngày",
  style,
  className,
  defaultFormat = "day",
  initialFormat,
  disableCustom = false,
  ...rest
}) => {
  const [selectedFormat, setSelectedFormat] = useState<DateFormat>(
    initialFormat || defaultFormat
  );

  // Update format when initialFormat changes (when API data is loaded)
  useEffect(() => {
    if (initialFormat && initialFormat !== selectedFormat) {
      setSelectedFormat(initialFormat);
      if (onFormatChange) {
        onFormatChange(initialFormat);
      }
    }
  }, [initialFormat, selectedFormat, onFormatChange]);

  const formatOptions = [
    {
      value: "day",
      label: "Ngày",
      format: {
        format: "DD/MM/YYYY",
        type: "mask" as const,
      },
      picker: undefined,
    },
    {
      value: "month",
      label: "Tháng",
      format: {
        format: "MM/YYYY",
        type: "mask" as const,
      },
      picker: "month" as const,
    },
    {
      value: "year",
      label: "Năm",
      format: {
        format: "YYYY",
        type: "mask" as const,
      },
      picker: "year" as const,
    },
  ];

  const currentOption =
    formatOptions.find((opt) => opt.value === selectedFormat) ||
    formatOptions[0];

  const handleFormatChange = (format: DateFormat) => {
    setSelectedFormat(format);
    // Clear current value when format changes
    // if (onChange) {
    //   onChange(null);
    // }
    // Callback to parent component
    if (onFormatChange) {
      onFormatChange(format);
    }
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className={cx("multi-type-date-picker", className)} style={style}>
      <div className={cx("format-selector")}>
        <Select
          disabled={disableCustom}
          value={selectedFormat}
          onChange={handleFormatChange}
          className={cx("format-select")}
        >
          {formatOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>

      <div className={cx("date-picker-wrapper")}>
        <DatePicker
          {...rest}
          value={value}
          onChange={handleDateChange}
          format={currentOption.format}
          picker={currentOption.picker}
          placeholder={placeholder}
          className={cx("date-picker")}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default MultiTypeDatePicker;
