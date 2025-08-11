import { BASE_URL, API_ROUTES } from './routes.js';

export const documentsApi = {
  async getDocuments() {
    try {
      const response = await fetch(`${BASE_URL}${API_ROUTES.DOCUMENTS}`);
      if (!response.ok) {
        throw new Error('Ошибка при получении документов');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
