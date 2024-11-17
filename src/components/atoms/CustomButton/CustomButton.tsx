import React from "react";
import styles from "./customButton.module.scss";

interface CustomButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  customStyles?: React.CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  icon,
  loading,
  customStyles,
  children,
}) => {
  return (
    <button
      disabled={loading}
      className={styles.customButton}
      onClick={onClick}
      style={customStyles}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default CustomButton;
