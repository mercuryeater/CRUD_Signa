import axios from "axios";
import config from "../../config";

const apiBrands = axios.create({
  baseURL: config.API_HOST, // Replace with your actual host URL
});

export const getOneBrand = async (brandId: string) => {
  try {
    const response = await apiBrands.get(`/api/brands/${brandId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand:", error);
    throw error;
  }
};

export const createBrand = async (brand: {
  brand_name: string;
  brand_owner: string;
}) => {
  try {
    const response = await apiBrands.post("/api/brands", brand);
    return response.data;
  } catch (error) {
    console.error("Error creating brand:", error);
    throw error;
  }
};

export const updateBrand = async (
  brandId: string,
  brand: {
    brand_name: string;
    brand_owner: string;
  }
) => {
  try {
    const response = await apiBrands.put(`/api/brands/${brandId}`, brand);
    return response.data;
  } catch (error) {
    console.error("Error updating brand:", error);
    throw error;
  }
};

export const deleteBrand = async (brandId: string) => {
  try {
    const response = await apiBrands.delete(`/api/brands/${brandId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting brand:", error);
    throw error;
  }
};
