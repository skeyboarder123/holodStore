import { BASE_URL, API_ROUTES } from './routes.js';

export const callbackApi = {
  async sendCallbackRequest(name, phone, message) {
    const url = `${BASE_URL}${API_ROUTES.CALLBACK_REQUESTS}`;
    const data = { name, phone, message };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
};
