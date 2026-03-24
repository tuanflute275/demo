import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

interface SmartDateRangeProps extends Omit<RangePickerProps, 'onChange' | 'value'> {
  value?: [string | null, string | null] | null;
  onChange?: (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null, dateStrings: [string, string]) => void;
}

const SmartDateRange: React.FC<SmartDateRangeProps> = ({ value, onChange, ...props }) => {
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

  // Convert string value to dayjs value
  const dayjsValue: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null = value
    ? [
        value[0] ? dayjs(value[0], 'DD/MM/YYYY') : null,
        value[1] ? dayjs(value[1], 'DD/MM/YYYY') : null,
      ]
    : null;

  const handleChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    if (onChange) {
      const dateStrings: [string, string] = dates
        ? [
            dates[0] ? dates[0].format('DD/MM/YYYY') : '',
            dates[1] ? dates[1].format('DD/MM/YYYY') : '',
          ]
        : ['', ''];
      onChange(dates, dateStrings);
    }
  };

  return (
    <RangePicker
      {...props}
      value={dayjsValue}
      onChange={handleChange}
      format="DD/MM/YYYY"
      placeholder={props.placeholder || ['dd/mm/yyyy', 'dd/mm/yyyy']}
      style={{ width: '100%', ...props.style }}
      onBlur={(e) => {
        const input = e.target as HTMLInputElement;
        const parsedDate = parseCustomDate(input.value);
        
        // Try to parse the input if user typed directly
        if (parsedDate && onChange && dayjsValue) {
          // Determine which input was focused (start or end)
          const currentValue = input.value;
          const isStartDate = dayjsValue[0]?.format('DD/MM/YYYY') !== currentValue;
          
          if (isStartDate) {
            handleChange([parsedDate, dayjsValue[1]]);
          } else {
            handleChange([dayjsValue[0], parsedDate]);
          }
        }
      }}
    />
  );
};

export default SmartDateRange;
