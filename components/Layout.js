import { useContext } from "react";
import { useRouter } from "next/router";
import { layoutStyles } from "../styles";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const handleIconClick = (route) => {
    if (isAuthenticated) {
      router.push(route);
    } else {
      router.push("/login");
    }
  };
  return (
    <div className={layoutStyles.container}>
      <header className={layoutStyles.upperNavbar}>
        <div className={layoutStyles.bell}>
          <FontAwesomeIcon
            icon={faBell}
            className={layoutStyles.notificationIcon}
          />
        </div>
        <div className={layoutStyles.logo}></div>
        <div onClick={() => handleIconClick("/profile")}>
          <img
            className={layoutStyles.profilePicture}
            src="/images/temp/pm1.jpg"
            alt="Profile Picture"
          />
        </div>
      </header>
      <main className={layoutStyles.content}>{children}</main>
      <footer className={layoutStyles.bottomNavbar}>
        <div
          className={layoutStyles.iconContainer}
          onClick={() => handleIconClick("/access")}
        >
          <FontAwesomeIcon icon={faCar} className={layoutStyles.profileIcon} />
        </div>
        <div
          className={layoutStyles.iconContainer}
          onClick={() => handleIconClick("/register")}
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
          <FontAwesomeIcon icon={faHome} className={layoutStyles.profileIcon} />
        </div>
        <div
          className={layoutStyles.iconContainer}
          onClick={() => handleIconClick("/profile")}
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
          <FontAwesomeIcon icon={faUser} className={layoutStyles.profileIcon} />
        </div>
      </footer>
    </div>
  );
};

export default Layout;
