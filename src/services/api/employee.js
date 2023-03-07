import { API_URL } from "@/const";
import axios from "axios";

export const getlistEmployee = async () => {
  return await
    axios.get(`${API_URL}/employees`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      })
};

export const editEmployee = async (payload) => {
  return await
    axios.put(`${API_URL}/employees/${payload.id}`, payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      })
};

export const addEmployee = async (payload) => {
  return await
    axios.post(`${API_URL}/employees`, payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return [];
      })
};