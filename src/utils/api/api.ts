import axios from "axios";
import config from "../../config";

export const fetcher = async (url: string) => {
  const response = await axios.get(`${config.API_HOST}${url}`);
  return response.data;
};
