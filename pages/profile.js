import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { profileStyles, layoutStyles } from "../styles";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faAppleWhole } from "@fortawesome/free-solid-svg-icons";
import { withAuth } from "../components/withAuth";
import { withAdmin } from "../components/withAdmin";

const profile = () => {
  const router = useRouter();
  const { user, handleLogOut, isDarkMode, handleToggle } =
    useContext(AuthContext);

  const logout = () => {
    handleLogOut();
  };

  const handleChangeProfilePicture = () => {
    console.log("hola");
  };

  const handleGiveAccess = () => {
    console.log("implement");
  };

  return (
    <div className={profileStyles.container}>
      <div className={profileStyles.header}>
        <div>
          <img
            className={profileStyles.profilePicture}
            src={user.img}
            alt="Profile Picture"
          />
          <button
            className={profileStyles.changePictureButton}
            onClick={handleChangeProfilePicture}
          >
            <FontAwesomeIcon icon={faCamera} />
          </button>
        </div>
        <div>
          <h2>{user.name}</h2>
          <h3>{user.email}</h3>
        </div>
        <div>
          <h3>Theme: </h3>
          <div>
            <div
              className={`${layoutStyles.themeSwitch} ${
                isDarkMode ? layoutStyles.darkMode : ""
              }`}
              onClick={handleToggle}
            >
              <div className={layoutStyles.slider} />
            </div>
          </div>
        </div>
      </div>

      <div className={profileStyles.containers}>
        <button className={profileStyles.change} onClick={handleGiveAccess}>
          Change Password
        </button>
        <button className={profileStyles.change} onClick={handleGiveAccess}>
          Log in with Google
        </button>
        <button className={profileStyles.change} onClick={handleGiveAccess}>
          <div>
            <FontAwesomeIcon icon={faAppleWhole} />
          </div>
          <div>Log in with Apple</div>
        </button>
        <button className={profileStyles.change} onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = withAuth();
export default profile;
