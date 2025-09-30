export const login = (username) => {
    localStorage.setItem('username', username); // key must match Dashboard
  };
  
  export const logout = () => {
    localStorage.removeItem('username');
  };
  
  export const isLoggedIn = () => {
    return localStorage.getItem('username') !== null;
  };
  