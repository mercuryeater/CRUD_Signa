import { useState } from "react";

import BrandRegistrationForm from "../../molecules/BrandRegistrationForm/BrandRegistrationForm";
import BrandsTable from "../../molecules/BrandsTable/BrandsTable";
import BrandModal from "../../molecules/BrandModal/BrandModal";

import { IBrand } from "../../../types/brands/brands";

import styles from "./brandRegistry.module.scss";

function BrandRegistry() {
  const [isRegisterFormActive, setIsRegisterFormActive] =
    useState<boolean>(false);

  const [isModalEditActive, setIsModalEditActive] = useState<{
    is_active: boolean;
    registry_id?: IBrand;
  }>({
    is_active: false,
  });

  const handleNewRegistry = () => {
    setIsRegisterFormActive(true);
  };

  return (
    <div className={styles.brandRegistryView}>
      <div className={styles.brandRegistryView__infoTitle}>
        <h2>Servicios &gt; Registro de marca</h2>
      </div>
      {isRegisterFormActive ? (
        <BrandRegistrationForm
          onCancel={() => setIsRegisterFormActive(false)}
        />
      ) : (
        <BrandsTable
          handleNewRegistry={handleNewRegistry}
          setIsModalEditActive={setIsModalEditActive}
        />
      )}
      <BrandModal
        isModalEditActive={isModalEditActive}
        onCancel={() => setIsModalEditActive({ is_active: false })}
      />
    </div>
  );
}

export default BrandRegistry;
