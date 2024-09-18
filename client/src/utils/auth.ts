import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from  '../interfaces/UserData'

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode<UserData>(this.getToken()); // decode  JWT to get user data 
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken(); // get token
    return !!token && !this.isTokenExpired(token); // check if token is not empty/expired
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token); // decode token 

      if (decoded?.exp && decoded?.exp < Date.now() / 1000) { //check if current time is greater than token expiration time
        return true;
      }
    } catch (err) {
      return false; // return false if error
    }
  }



  getToken(): string {
    // TODO: return the token
    const loggedUser = localStorage.getItem('id_token') || ''; 
    return loggedUser;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken); // set token to local storage
    // TODO: redirect to the home page
    window.location.assign('/'); 
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token'); // remove token from local storage
    // TODO: redirect to the login page
    window.location.assign('/login'); 
  }
}

export default new AuthService();
