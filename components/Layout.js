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
  faArrowLeft,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Layout = ({ children }) => {
  const { setUser, isDarkMode, setAmenity, readLocalStorage } =
    useContext(AuthContext);
  const user = children.props.user;
  const router = useRouter();

  useEffect(() => {
    setUser(user);
    readLocalStorage();
    console.log("layout rendered", isDarkMode);
  }, []);

  const handleIconClick = (route) => {
    router.push(route);
  };

  return (
    <div
      className={`${layoutStyles.container}  ${
        isDarkMode ? layoutStyles.dark : layoutStyles.light
      }`}
    >
      <header
        className={`${layoutStyles.upperNavbarWrap}  ${
          isDarkMode ? layoutStyles.dark : layoutStyles.light
        }`}
      >
        <div className={layoutStyles.upperNavbar}>
          {user && (
            <div className={layoutStyles.bellWrap}>
              <div className={layoutStyles.bell}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  onClick={() => {
                    router.back();
                    setAmenity({});
                  }}
                />
              </div>
            </div>
          )}

          <img
            className={layoutStyles.logo}
            src={`/images/logos/${isDarkMode ? "gewi-lp.png" : "gewi-np.png"}`}
            onClick={() => {
              setAmenity({});
              handleIconClick("/");
            }}
          />

          {user && (
            <div className={layoutStyles.profile}>
              <div className={layoutStyles.profileRight}>
                <FontAwesomeIcon
                  icon={faQrcode}
                  className={layoutStyles.profileIcon}
                  onClick={() => router.push("/key")}
                />
                <FontAwesomeIcon
                  icon={faBell}
                  className={layoutStyles.profileIcon}
                  onClick={() => router.push("/notifications")}
                />
              </div>
            </div>
          )}
        </div>
      </header>
      <main className={layoutStyles.content}>{children}</main>
      <footer
        className={`${layoutStyles.bottomNavbarWrap}  ${
          isDarkMode ? layoutStyles.dark : layoutStyles.light
        }`}
      >
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
                onClick={() => {
                  setAmenity({});
                  handleIconClick("/statement");
                }}
              >
                <FontAwesomeIcon
                  icon={faWallet}
                  className={layoutStyles.profileIcon}
                />
              </div>
              <div
                className={layoutStyles.iconContainer}
                onClick={() => {
                  setAmenity({});
                  handleIconClick("/");
                }}
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
                onClick={() => {
                  setAmenity({});
                  handleIconClick("/profile");
                }}
              >
                <img
                  className={layoutStyles.profilePicture}
                  src={user.img}
                  alt="Profile Picture"
                />
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
