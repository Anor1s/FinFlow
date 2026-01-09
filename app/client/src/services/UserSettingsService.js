const API_URL = `${import.meta.env.VITE_API_URL}/settings`;

export const UserSettingsService = {
  async updateBaseCurrency(currency) {
    const response = await fetch(`${API_URL}/StandardCurrency`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ baseCurrency: currency }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to save settings');
    }

    return await response.json();
  }
};

export default UserSettingsService;