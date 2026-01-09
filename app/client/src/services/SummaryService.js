const API_URL = `${import.meta.env.VITE_API_URL}/summary`;

const SummaryService = {
  // Fetches the dashboard summary data (Balance, Income, Spending, etc.)
  async getSummary() {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: please log in');
        }
        throw new Error('Server error while fetching summary data');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error (GET):', error.message);
      throw error;
    }
  },
};

export default SummaryService;