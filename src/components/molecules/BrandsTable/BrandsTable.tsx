import { PlusCircle } from "@phosphor-icons/react";
import { message, Space, Spin, Table, TableProps, Tag } from "antd";

import { deleteBrand } from "../../../services/brands/brands";
import { useBrands } from "../../../services/hooks/useBrands/useBrands";
import CustomButton from "../../atoms/CustomButton/CustomButton";

import { IBrand } from "../../../types/brands/brands";

import "./brandsTable.scss";

interface BrandsTableProps {
  handleNewRegistry: () => void;
  setIsModalEditActive: React.Dispatch<
    React.SetStateAction<{
      is_active: boolean;
      brand?: IBrand;
    }>
  >;
}

const BrandsTable: React.FC<BrandsTableProps> = ({
  handleNewRegistry,
  setIsModalEditActive,
}) => {
  const { data, isLoading, mutate } = useBrands();

  const handleDeleteBrand = async (brandId: string) => {
    try {
      await deleteBrand(brandId);
      message.success("Marca eliminada correctamente");
      mutate();
    } catch (error) {
      console.log("Error deleting brand", error);
      message.error(
        "Error al eliminar la marca. Por favor, inténtelo de nuevo."
      );
    }
  };

  const handleUpdateClient = (brand: IBrand) => {
    setIsModalEditActive({
      is_active: true,
      brand: brand,
    });
  };

  const columns: TableProps<IBrand>["columns"] = [
    {
      title: "Marca",
      dataIndex: "brand_name",
      key: "brand_name",
    },
    {
      title: "Titular",
      dataIndex: "brand_owner",
      key: "brand_owner",
    },
    {
      title: "Estado",
      dataIndex: "brand_status",
      key: "brand_status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Activa" : "Inactiva"}
        </Tag>
      ),
    },

    {
      title: "Acciones",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDeleteBrand(record._id)}>Eliminar </a>
          <a onClick={() => handleUpdateClient(record)}>Actualizar</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="BrandsTableContainer">
      <div className="BrandsTableContainer__header">
        <h3>Marcas actuales</h3>
        <CustomButton
          onClick={handleNewRegistry}
          icon={<PlusCircle size={26} />}
          customStyles={{ alignSelf: "flex-end" }}
        >
          Nuevo Registro
        </CustomButton>
      </div>
      {isLoading ? (
        <Spin />
      ) : (
        <Table className="BrandsTable" columns={columns} dataSource={data} />
      )}
    </div>
  );
};

export default BrandsTable;
