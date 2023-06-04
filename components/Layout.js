import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { layoutStyles } from "../styles";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isAuth } from "../helpers/auth";
import {
  faBell,
  faUser,
  faCar,
  faWallet,
  faHome,
  faCouch,
} from "@fortawesome/free-solid-svg-icons";
//import { MongoClient } from "mongodb";
import Link from "next/link";

const Layout = ({ children }) => {
  const { setAmenity, isAuthenticated, setUser, user } =
    useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    const userI = isAuth();
    if (!userI) {
      router.push("/login");
    }
    setUser(userI);
  }, []);

  const handleIconClick = (route) => {
    if (isAuthenticated) {
      setAmenity();
      router.push(route);
    } else {
      router.push("/login");
    }
  };
  return (
    <div className={layoutStyles.container}>
      <header className={layoutStyles.upperNavbar}>
        {isAuth() && (
          <div
            className={layoutStyles.bell}
            onClick={() => router.push("/notifications")}
          >
            <FontAwesomeIcon
              icon={faBell}
              className={layoutStyles.notificationIcon}
            />
          </div>
        )}
        <div className={layoutStyles.logo}></div>
        {isAuth() && (
          <div onClick={() => handleIconClick("/profile")}>
            <img
              className={layoutStyles.profilePicture}
              src={user.img}
              alt="Profile Picture"
            />
          </div>
        )}
      </header>
      <main className={layoutStyles.content}>{children}</main>
      <footer className={layoutStyles.bottomNavbar}>
        {isAuth() && (
          <>
            <div
              className={layoutStyles.iconContainer}
              onClick={() => handleIconClick("/access")}
            >
              <FontAwesomeIcon
                icon={faCar}
                className={layoutStyles.profileIcon}
              />
            </div>
            <div
              className={layoutStyles.iconContainer}
              onClick={() => handleIconClick("/statement")}
            >
              <FontAwesomeIcon
                icon={faWallet}
                className={layoutStyles.profileIcon}
              />
            </div>
            <div
              className={layoutStyles.iconContainer}
              onClick={() => handleIconClick("/home")}
            >
              <FontAwesomeIcon
                icon={faHome}
                className={layoutStyles.profileIcon}
              />
            </div>
            <div
              className={layoutStyles.iconContainer}
              onClick={() => handleIconClick("/amenity")}
            >
              <FontAwesomeIcon
                icon={faCouch}
                className={layoutStyles.profileIcon}
              />
            </div>
            <div
              className={layoutStyles.iconContainer}
              onClick={() => handleIconClick("/profile")}
            >
              <FontAwesomeIcon
                icon={faUser}
                className={layoutStyles.profileIcon}
              />
            </div>
          </>
        )}
      </footer>
    </div>
  );
};

export default Layout;
