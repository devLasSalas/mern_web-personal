import { useState, useEffect, createContext } from "react";
import { User, Auth } from "../api";

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [laoding, setLaoding] = useState(true);

  useEffect(() => {
    (async () => {
      const accessToken = authController.getAccessToken();
      await login(accessToken) 
      setLaoding(false);

    })();
    return;
  }, []);

  const login = async (accessToken) => {
    try {
      const response = await userController.getMe(accessToken);
      delete response.password;

      setUser(response);
      setToken(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeTokens();
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
  };

  if (laoding) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
