import React, { useState } from "react";
import { Steps } from "antd";
import CustomButton from "../CustomButton/CustomButton";

import styles from "./StepsUI.module.scss";

interface StepsProps {
  steps: {
    title?: string;
    content?: React.ReactNode;
  }[];
  loadingState?: boolean;
  onFirstCancel: () => void;
  onLastConfirm?: () => void;
  customDoneText?: string;
}

const StepsUI: React.FC<StepsProps> = ({
  steps,
  loadingState,
  onFirstCancel,
  onLastConfirm,
  customDoneText,
}) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = (currentAsProp?: number) => {
    if (currentAsProp === 0) {
      onFirstCancel();
    }
    setCurrent(current - 1);
  };

  const handleConfirm = () => {
    if (onLastConfirm) onLastConfirm();
  };

  const items = steps.map((item, i) => ({
    key: i,
    title: item.title,
  }));

  const fullWidthStyles = {
    width: "100%",
  };

  return (
    <div className={styles.stepsUI}>
      <Steps className={styles.stepsBar} current={current} items={items} />
      <div key={current}>{steps[current].content}</div>
      <div className={styles.footer}>
        {
          <CustomButton
            customStyles={fullWidthStyles}
            onClick={() => prev(current)}
          >
            Atras
          </CustomButton>
        }
        {current < steps.length - 1 && (
          <CustomButton onClick={() => next()} customStyles={fullWidthStyles}>
            Continuar
          </CustomButton>
        )}
        {current === steps.length - 1 && (
          <CustomButton
            loading={loadingState}
            onClick={handleConfirm}
            customStyles={fullWidthStyles}
          >
            {customDoneText ? customDoneText : "Confirmar"}
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default StepsUI;
