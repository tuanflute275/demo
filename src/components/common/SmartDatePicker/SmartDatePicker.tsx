import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { DatePickerProps } from 'antd';

interface SmartDatePickerProps extends Omit<DatePickerProps, 'onChange'> {
  onChange?: (date: dayjs.Dayjs | null, dateString: string | string[]) => void;
}

const SmartDatePicker: React.FC<SmartDatePickerProps> = (props) => {
  const parseCustomDate = (value: string) => {
    if (!value) return null;
    
    // Remove any non-numeric characters except /
    const cleaned = value.replace(/[^\d/]/g, '');
    
    // Parse ddmmyyyy format (e.g., "11112025" -> "11/11/2025")
    if (/^\d{8}$/.test(cleaned)) {
      const day = cleaned.substring(0, 2);
      const month = cleaned.substring(2, 4);
      const year = cleaned.substring(4, 8);
      const formattedDate = `${day}/${month}/${year}`;
      const parsed = dayjs(formattedDate, 'DD/MM/YYYY', true);
      return parsed.isValid() ? parsed : null;
    }
    // Parse dd/mm/yyyy format
    else if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cleaned)) {
      const parsed = dayjs(cleaned, 'DD/MM/YYYY', true);
      return parsed.isValid() ? parsed : null;
    }
    
    return null;
  };

  return (
    <DatePicker
      {...props}
      format="DD/MM/YYYY"
      placeholder={props.placeholder || "dd/mm/yyyy hoặc ddmmyyyy"}
      onBlur={(e) => {
        const input = e.target as HTMLInputElement;
        const parsedDate = parseCustomDate(input.value);
        if (parsedDate && props.onChange) {
          props.onChange(parsedDate, input.value);
        }
      }}
    />
  );
};

export default SmartDatePicker;