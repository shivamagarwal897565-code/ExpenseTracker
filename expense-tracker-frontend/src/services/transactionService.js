import api from "./api";

export const getTransactions = async () => {
  const response = await api.get("/transactions");

  return response.data;
};

export const getTransaction = async (id) => {
  const response = await api.get(`/transactions/${id}`);

  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await api.delete(`/transactions/${id}`);

  return response.data;
};

export const createTransaction = async (formData) => {
  const response = await api.post(
    "/transactions",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateTransaction = async (
  id,
  formData
) => {
  const response = await api.put(
    `/transactions/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};