import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [amenity, setAmenity] = useState();
  const [chat, setChat] = useState();
  const [qrDetail, setQrDetail] = useState();

  const handleAuth = () => {};

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
