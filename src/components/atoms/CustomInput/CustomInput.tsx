import React from "react";
import { UseFormRegister } from "react-hook-form";
import styles from "./customInput.module.scss";

interface CustomInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  required?: boolean;
  value?: string;
  readOnly?: boolean;
  customStyles?: React.CSSProperties;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  register,
  required,
  value,
  readOnly,
  customStyles,
}) => {
  return (
    <input
      style={customStyles}
      id={name}
      {...(register ? register(name, { required }) : {})}
      className={styles.input}
      value={value}
      readOnly={readOnly}
    />
  );
};

export default CustomInput;
