import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { layoutStyles } from "../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withAuth } from "./withAuth";
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
  const { setUser, isDarkMode, handleToggle, setAmenity } =
    useContext(AuthContext);
  const user = children.props.user;
  const router = useRouter();

  useEffect(() => {
    setUser(user);
    console.log("layout rendered");
  }, []);

  const handleIconClick = (route) => {
    router.push(route);
  };

  return (
    <div
      className={`${layoutStyles.container}  ${
        isDarkMode ? layoutStyles.darkdark : ""
      }`}
    >
      <img
        className={`${layoutStyles.bg} ${isDarkMode ? layoutStyles.dark : ""}`}
        alt=""
      ></img>
      <header className={layoutStyles.upperNavbarWrap}>
        <div className={layoutStyles.upperNavbar}>
          {user && (
            <div className={layoutStyles.bellWrap}>
              <div
                className={layoutStyles.bell}
                onClick={() => router.push("/notifications")}
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className={layoutStyles.profileIcon}
                />
              </div>
            </div>
          )}

          <img
            className={layoutStyles.logo}
            src={"/images/logos/gewi-lp.png"}
            onClick={() => {
              setAmenity({});
              handleIconClick("/");
            }}
          />
        </div>
      </header>
      <main className={layoutStyles.content}>{children}</main>
      <footer className={layoutStyles.bottomNavbarWrap}>
        <div className={layoutStyles.bottomNavbar}>
          {user && (
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
                onClick={() => handleIconClick("/")}
              >
                <FontAwesomeIcon
                  icon={faHome}
                  className={layoutStyles.profileIcon}
                />
              </div>
              <div
                className={layoutStyles.iconContainer}
                onClick={() => {
                  setAmenity({});
                  handleIconClick("/amenity");
                }}
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
                <img
                  className={layoutStyles.profilePicture}
                  src={user.img}
                  alt="Profile Picture"
                />
                {/* <FontAwesomeIcon
                  icon={faUser}
                  className={layoutStyles.profileIcon}
                /> */}
              </div>
            </>
          )}
        </div>
      </footer>
    </div>
  );
};
export const getServerSideProps = withAuth();
export default Layout;
