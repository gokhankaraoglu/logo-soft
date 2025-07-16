import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MaskedTextInput from "react-text-mask";

interface DateInputProps {
  id: string;
  name: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  message?: string;
  touched?: boolean;
  label?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  name,
  value,
  onChange,
  message,
  touched,
  label,
}) => {
  return (
    <div className="input-wrapper vertical">
      {label && (
        <label htmlFor={id} className="label-area mb-2">
          {label}
        </label>
      )}
      <DatePicker
        id={id}
        selected={value ? new Date(value) : null}
        onChange={(date) => {
          if (date) {
            const syntheticEvent = {
              target: {
                value: date.toISOString().split("T")[0],
                name: name,
              },
            } as unknown as ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
          }
        }}
        dateFormat="dd/MM/yyyy"
        maxDate={new Date()}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className={`input-area ${
          message && touched && "!border-red-500 !border-2"
        }  focus:border-indigo-600 focus:border-2`}
        autoComplete="off"
        showIcon
        customInput={
          <MaskedTextInput
            type="text"
            mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
          />
        }
        icon={
          <div className="mr-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.14286 7.90176H16.7812M6.48512 2.4375V4.07698M17.3125 2.4375V4.07678M20.5 7.07678L20.5 18.5625C20.5 20.2194 19.1569 21.5625 17.5 21.5625H6.5C4.84315 21.5625 3.5 20.2194 3.5 18.5625V7.07678C3.5 5.41992 4.84315 4.07678 6.5 4.07678H17.5C19.1569 4.07678 20.5 5.41992 20.5 7.07678Z"
                stroke="#667085"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        }
      />
      {message && touched && (
        <div className="text-xs text-red-500 mt-1">{message}</div>
      )}
    </div>
  );
};

export default DateInput;
