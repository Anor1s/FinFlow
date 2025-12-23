const API_URL = import.meta.env.VITE_API_URL;

const AuthService = {
  fetchOptions: {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  },

  async checkAuth() {
    try {
      const response = await fetch(`${API_URL}/protected`, {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        return true;
      } else {
        localStorage.removeItem('isLoggedIn');
        return false;
      }
    } catch (e) {
      localStorage.removeItem('isLoggedIn');
      return false;
    }
  },

  async register(username, email, password, repeatPassword) {
    const response = await fetch(`${API_URL}/register`, {
      ...this.fetchOptions,
      method: 'POST',
      body: JSON.stringify({ username, email, password, repeatPassword })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Registration failed');

    localStorage.setItem('isLoggedIn', 'true');
    return data;
  },

  async login(identifier, password) {
    const response = await fetch(`${API_URL}/login`, {
      ...this.fetchOptions,
      method: 'POST',
      body: JSON.stringify({ identifier, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');

    localStorage.setItem('isLoggedIn', 'true');
    return data;
  },

  async deleteAccount() {
    const response = await fetch(`${API_URL}/delete`, {
      ...this.fetchOptions,
      method: 'DELETE'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Account deletion failed');

    return data;
  },

  async logout() {
    try {
      await fetch(`${API_URL}/logout`, {
        ...this.fetchOptions,
        method: 'POST'
      });
    } catch (err) {
      console.error("Server-side logout error:", err);
    } finally {
      localStorage.removeItem('isLoggedIn');
      window.location.reload();
    }
  },

  async getProfile() {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      ...this.fetchOptions
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch user profile');
    }

    return data;
  }
};

export default AuthService;