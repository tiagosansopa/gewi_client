import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [amenity, setAmenity] = useState();
  const [chat, setChat] = useState();

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
