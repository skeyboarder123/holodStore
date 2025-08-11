import { BASE_URL, API_ROUTES } from './routes.js';

export const ordersApi = {
  async getPendingOrders() {
    try {
      const response = await fetch(`${BASE_URL}${API_ROUTES.PENDING_ORDERS}`);
      if (!response.ok) {
        throw new Error('Ошибка при получении ожидающих заказов');
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при запросе ожидающих заказов:', error);
      throw error;
    }
  },
};
