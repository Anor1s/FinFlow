const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const AuthService = {
  fetchOptions: {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  },


  async refresh() {
    try {
      const response = await fetch(`${API_URL}/refresh`, {
        method: 'POST',
        credentials: 'include'
      });
      return response.ok;
    } catch (e) {
      console.error("Refresh request failed:", e);
      return false;
    }
  },


  async authenticatedFetch(url, options = {}) {
    const mergedOptions = { ...this.fetchOptions, ...options };
    let response = await fetch(url, mergedOptions);

    if (response.status === 401) {
      console.warn("Access token expired, attempting refresh...");

      const refreshed = await this.refresh();

      if (refreshed) {
        console.log("Token refreshed successfully. Retrying original request...");
        response = await fetch(url, mergedOptions);
      } else {
        console.error("Refresh failed. Redirecting to login.");
        this.logout();
        throw new Error("SESSION_EXPIRED");
      }
    }

    return response;
  },

  async checkAuth() {
    try {
      const response = await this.authenticatedFetch(`${API_URL}/protected`, {
        method: 'GET'
      });

      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        return true;
      }

      localStorage.removeItem('isLoggedIn');
      return false;
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
    const response = await this.authenticatedFetch(`${API_URL}/delete`, {
      method: 'DELETE'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Account deletion failed');

    localStorage.removeItem('isLoggedIn');
    return data;
  },


  async authenticatedFetch(url, options = {}) {
    const mergedOptions = { ...this.fetchOptions, ...options };
    let response = await fetch(url, mergedOptions);

    if (response.status === 401) {
      if (url.includes('/refresh')) {
        throw new Error("REFRESH_FAILED");
      }

      console.warn("Access token expired, attempting refresh...");
      const refreshed = await this.refresh();

      if (refreshed) {
        return await fetch(url, mergedOptions);
      } else {
        this.clearLocalSession();
        throw new Error("SESSION_EXPIRED");
      }
    }

    return response;
  },

  clearLocalSession() {
    localStorage.removeItem('isLoggedIn');
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
      this.clearLocalSession();

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  },

  async getProfile() {
    const response = await this.authenticatedFetch(`${API_URL}/profile`, {
      method: 'GET'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch user profile');
    }

    return data;
  }
};

export default AuthService;