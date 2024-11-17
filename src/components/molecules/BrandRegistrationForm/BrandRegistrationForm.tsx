import { useState } from "react";
import { useForm } from "react-hook-form";
import { message } from "antd";

import { createBrand } from "../../../services/brands/brands";
import StepsUI from "../../atoms/StepsUI/StepsUI";
import CustomInput from "../../atoms/CustomInput/CustomInput";

import styles from "./brandRegistrationForm.module.scss";

export interface IFormInput {
  brand_name: string;
  brand_owner: string;
}

interface BrandRegistrationFormProps {
  onCancel: () => void;
}

const BrandRegistrationForm: React.FC<BrandRegistrationFormProps> = ({
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm<IFormInput>({
    defaultValues: {
      brand_name: "",
      brand_owner: "",
    },
  });

  const brand_name = watch("brand_name");
  const brand_owner = watch("brand_owner");

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    setLoading(true);
    try {
      await createBrand(data);
      message.success("Marca creada correctamente.");
    } catch (error) {
      console.error("Error creating brand:", error);
      message.error("Error al crear la marca. Por favor, inténtelo de nuevo.");
    }
    onCancel();
    setLoading(false);
  };

  const stepsItems = [
    {
      content: (
        <div className={styles.stage}>
          <h4 className={styles.stage__title}>Información de la marca</h4>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="brand_name">
              Marca a registrar
            </label>
            <CustomInput name="brand_name" register={register} />
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className={styles.stage}>
          <h4 className={styles.stage__title}>Información del titular</h4>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="brand_owner">
              Nombre del titular
            </label>
            <CustomInput name="brand_owner" register={register} />
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className={styles.stage}>
          <h4 className={styles.stage__title}>Resumen</h4>
          <div className={styles.summary}>
            <div className={styles.summary__item}>
              <label
                className={styles.labelSummary}
                htmlFor="brandNameReadonly"
              >
                Marca a registrar
              </label>
              <CustomInput
                name="brandNameReadonly"
                value={brand_name}
                readOnly
              />
            </div>
            <div className={styles.summary__item}>
              <label
                className={styles.labelSummary}
                htmlFor="ownerNameReadonly"
              >
                Titular de la marca
              </label>
              <CustomInput
                name="ownerNameReadonly"
                value={brand_owner}
                readOnly
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.newBrandForm}>
      <StepsUI
        customDoneText="Crear"
        steps={stepsItems}
        loadingState={loading}
        onFirstCancel={onCancel}
        onLastConfirm={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default BrandRegistrationForm;
