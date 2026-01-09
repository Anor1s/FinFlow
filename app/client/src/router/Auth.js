const Auth = {
  isAuthenticated() {
    return document.cookie.split(';').some(row => row.trim().startsWith('isLoggedIn=true'));
  }
};

export default Auth;