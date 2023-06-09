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
  const { setAmenity, setUser } = useContext(AuthContext);
  const router = useRouter();
  const user = children.props.user;
  setUser(user);

  useEffect(() => {
    console.log("layout rendered");
  }, []);

  const handleIconClick = (route) => {
    router.push(route);
  };

  return (
    <div className={layoutStyles.container}>
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
            src={"/images/logos/gewi_txt.png"}
            onClick={() => handleIconClick("/")}
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
