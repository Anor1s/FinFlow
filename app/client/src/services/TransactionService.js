const API_URL = `${import.meta.env.VITE_API_URL}/transactions`;

const TransactionService = {
  // Fetches all transactions for the current use
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/AllTransactions`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: please log in');
        }
        throw new Error('Server error while fetching data');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error (GET):', error.message);
      throw error;
    }
  },

  // Sends a new transaction to the server
  async create(transactionData) {
    try {
      const response = await fetch(`${API_URL}/CreateTransaction`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: please log in');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Server error while creating transaction');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error (POST):', error.message);
      throw error;
    }
  },

  async delete(transactionId) {
    try {
      const response = await fetch(`${API_URL}/DeleteTransaction/${transactionId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: please log in');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Server error while deleting transaction');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error (DELETE):', error.message);
      throw error;
    }
  }
};

export default TransactionService;