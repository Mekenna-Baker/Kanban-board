import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
  
      const data = await response.json();
  
      if (response.ok) {
          
          localStorage.setItem('token', data.token);
          return data;
      } else {
          // Throw an error with the server-provided message or a default message
          throw new Error(data.message || 'Authentication failed. Check username and password.');
      }
    } catch (error) {
      console.error('Login error: ', error);
      throw error;  // Re-throw to handle this error in UI components or further up the chain
    }
  };
  
  const logout = () => {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login after logout
  };


export { login, logout };
