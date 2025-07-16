import React, { ChangeEvent, memo } from "react";
import CustomInput, { InputType } from "./elements/CustomInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface InputSectionsProps {
  questionID: number;
  questionName: string;
  questionCode: string;
  message: string;
  touched: boolean;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement> | Date | null) => void;
}

const InputSections: React.FC<InputSectionsProps> = memo(
  ({
    questionID,
    questionName,
    questionCode,
    message,
    touched,
    value,
    onChange,
  }) => {
    switch (questionID) {
      case 44: // DOĞUM TARİHİ
        return (
          <div className="input-wrapper vertical">
            <label htmlFor={questionCode} className="label-area mb-2">
              {questionName}
            </label>
            <DatePicker
              id={questionCode}
              selected={value ? new Date(value) : null}
              onChange={(date) => {
                if (date) {
                  const formattedDate = date.toISOString().split("T")[0];
                  onChange(formattedDate as unknown as Date);
                } else {
                  onChange(null);
                }
              }}
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              className={`input-area ${
                message && touched && "!border-red-500 !border-2"
              }  focus:border-indigo-600 focus:border-2 valid:border-green-400`}
              autoComplete="off"
              showIcon
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
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
      case 14: // T.C. KİMLİK NUMARASI
        return (
          <CustomInput
            id={questionCode}
            type={InputType.NUMBER}
            name={questionName}
            minlength={11}
            maxlength={11}
            onChange={onChange}
            value={value}
            message={message}
            touched={touched}
          />
        );
      case 15: // VERGİ KİMLİK NUMARASI
        return (
          <CustomInput
            id={questionCode}
            type={InputType.NUMBER}
            name={questionName}
            message={message}
            touched={touched}
            onChange={onChange}
            value={value}
          />
        );
      case 42: // CEP TELEFONU
        return (
          <CustomInput
            id={questionCode}
            type={InputType.TEL}
            name={questionName}
            onChange={onChange}
            placeholder="5554443322"
            value={value}
            message={message}
            touched={touched}
          />
        );
      case 77: // E-MAIL ADRESİ
        return (
          <CustomInput
            id={questionCode}
            type={InputType.TEXT}
            name="E-Mail Adresi"
            onChange={onChange}
            value={value}
            message={message}
            touched={touched}
          />
        );
      case 197: // CİHAZ MARKA
      case 199: // MODEL
      case 200: // SERİ NO
      case 201: // PLATFORM
      case 202: // SİPARİŞ NO
        return (
          <CustomInput
            id={questionCode}
            type={InputType.TEXT}
            name={questionName}
            onChange={onChange}
            message={message}
            touched={touched}
          />
        );
      case 203: // EKRAN KIRILMASI
      case 204: // KAZAEN KIRILMA
      case 205: // UZATILMIŞ GARANTİ
      case 206: // CİHAZ BEDELİ
      case 5: // PLAKA NO
        return (
          <CustomInput
            id={questionCode}
            type={InputType.TEXT}
            name={questionName}
            onChange={onChange}
            message={message}
            touched={touched}
            value={value ? value.toUpperCase() : value}
          />
        );
      case 30: // BELGE SERI NO
        return (
          <CustomInput
            id={questionCode}
            type={InputType.TEXT}
            name="Ruhsat Belge Seri No"
            onChange={onChange}
            message={message}
            touched={touched}
            value={value ? value.toUpperCase() : value}
          />
        );
      default:
        return null;
    }
  }
);
InputSections.displayName = "InputSections";

export default InputSections;
