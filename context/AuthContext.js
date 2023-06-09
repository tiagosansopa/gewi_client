import { createContext, useState } from "react";
import { useRouter } from "next/router";
import { logout, isAuth } from "../helpers/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [amenity, setAmenity] = useState();
  const [chat, setChat] = useState();
  const [qrDetail, setQrDetail] = useState();
  const [user, setUser] = useState({});

  const readLocalStorage = () => {
    const loggedUser = isAuth();
    if (loggedUser) {
      setUser(loggedUser);
    }
  };

  const handleLogOut = () => {
    router.push("/login");
    setIsAuthenticated(false);
    setAmenity();
    setChat();
    setQrDetail();
    setUser({});
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        amenity,
        setAmenity,
        chat,
        setChat,
        setQrDetail,
        qrDetail,
        user,
        setUser,
        handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
