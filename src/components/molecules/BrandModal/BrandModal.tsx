import React, { useState } from "react";
import { message, Modal } from "antd";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

import { updateBrand } from "../../../services/brands/brands";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import CustomButton from "../../atoms/CustomButton/CustomButton";

import { IBrand } from "../../../types/brands/brands";

import styles from "./brandModal.module.scss";

interface BrandModalProps {
  isModalEditActive: {
    is_active: boolean;
    brand?: IBrand;
  };
  onCancel: () => void;
}

interface IFormInput {
  brand_name: string;
  brand_owner: string;
}

const BrandModal: React.FC<BrandModalProps> = ({
  isModalEditActive,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);
  const { brand } = isModalEditActive;
  const { register, handleSubmit } = useForm<IFormInput>({
    values: {
      brand_name: brand?.brand_name || "",
      brand_owner: brand?.brand_owner || "",
    },
  });

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    if (!brand) return;
    try {
      await updateBrand(brand._id, data);
      message.success("Marca actualizada correctamente.");
      mutate("/api/brands");
      onCancel();
    } catch (error) {
      console.error("Error creating brand:", error);
      message.error("Error al crear la marca. Por favor, inténtelo de nuevo.");
    }
    setLoading(false);
  };

  const fullWidthStyles = {
    width: "100%",
    justifySelf: "end",
  };

  return (
    <Modal
      className={styles.brandModal}
      open={isModalEditActive.is_active}
      onCancel={onCancel}
      footer={null}
      closeIcon={null}
    >
      <h2 className={styles.brandModal__title}>Editar marca</h2>
      <div className={styles.form}>
        <div className={styles.form__item}>
          <label className={styles.labelForm} htmlFor="brand_name">
            Nombre de la marca
          </label>
          <CustomInput name="brand_name" register={register} />
        </div>
        <div className={styles.form__item}>
          <label className={styles.labelForm} htmlFor="brand_owner">
            Titular de la marca
          </label>
          <CustomInput name="brand_owner" register={register} />
        </div>
        <div className={styles.footer}>
          <CustomButton customStyles={fullWidthStyles} onClick={onCancel}>
            Cancelar
          </CustomButton>
          <CustomButton
            loading={loading}
            customStyles={fullWidthStyles}
            onClick={handleSubmit(onSubmit)}
          >
            Confirmar
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

export default BrandModal;
