import { createContext, useDebugValue, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  logout,
  isAuth,
  setLocalStorage,
  getLocalStorage,
} from "../helpers/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [amenity, setAmenity] = useState({});
  const [chat, setChat] = useState({});
  const [qrDetail, setQrDetail] = useState({});
  const [user, setUser] = useState({});

  const readLocalStorage = () => {
    const workAround = getLocalStorage("ctxt");
    const {
      amenity: prevAme,
      chat: prevChat,
      qrDetail: qr,
      user: preUser,
    } = workAround;
    setAmenity(prevAme);
    setChat(prevChat);
    setQrDetail(qr);
    setUser(setUser);
    console.log("lei el local", workAround);
    return workAround;
  };

  const handleContextChange = () => {
    const context = {
      amenity,
      chat,
      qrDetail,
      user,
    };
    setLocalStorage("ctxt", context);
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
        handleContextChange,
        readLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
