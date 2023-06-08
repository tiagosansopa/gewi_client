import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { layoutStyles } from "../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withAuth } from "./withAuth";
import { isAuth } from "../helpers/auth";
import AuthContext from "../context/AuthContext";
import {
  faBell,
  faUser,
  faCar,
  faWallet,
  faHome,
  faCouch,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Layout = ({ children }) => {
  const { setAmenity, isAuthenticated, setUser, user } =
    useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    console.log("layout render");
    const userI = isAuth();
    setUser(userI);
  }, []);

  const handleIconClick = (route) => {
    if (isAuthenticated) {
      router.push(route);
    } else {
      router.push("/login");
    }
  };
  return (
    <div className={layoutStyles.container}>
      <header className={layoutStyles.upperNavbarWrap}>
        <div className={layoutStyles.upperNavbar}>
          {isAuth() && (
            <div
              className={layoutStyles.bell}
              onClick={() => router.push("/notifications")}
            >
              <FontAwesomeIcon
                icon={faBell}
                className={layoutStyles.profileIcon}
              />
            </div>
          )}
          <div
            className={layoutStyles.logo}
            onClick={() => handleIconClick("/")}
          ></div>
        </div>
      </header>
      <main className={layoutStyles.content}>{children}</main>
      <footer className={layoutStyles.bottomNavbarWrap}>
        {isAuth() && (
          <div className={layoutStyles.bottomNavbar}>
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
              onClick={() => handleIconClick("/")}
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
              {user ? (
                <img
                  className={layoutStyles.profilePicture}
                  src={user.img}
                  alt="Profile Picture"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  className={layoutStyles.profileIcon}
                />
              )}
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export const getServerSideProps = withAuth();
export default Layout;
