const API_URL = `${import.meta.env.VITE_API_URL}/charts`;

const ChartService = {
  async getSummary(from = '', to = '') {
    const query = new URLSearchParams({ from, to }).toString();

    const response = await fetch(`${API_URL}?${query}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized access to charts. Check backend cookie-parser.");
      }
      throw new Error('Failed to fetch chart data');
    }

    return await response.json();
  }
};

export default ChartService;