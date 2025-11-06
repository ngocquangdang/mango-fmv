import { apiClient } from "../../../lib/api/api-client";

export const getUserInfo = async (id?: string | null) => {
  const response = await apiClient.get(`/users/${id}`);
  return response;
};

export const updateStatus = async (payload: Record<string, any>) => {
  const response = await apiClient.put(`/users/status`, payload);
  return response;
};

export const getChapters = async () => {
  const response = await apiClient.get(`/chapters`);
  return response;
};

export const getChapter = async (id: string) => {
  const response = await apiClient.get(`/chapters/${id}`);
  return response;
};