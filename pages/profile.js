import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { profileStyles, layoutStyles } from "../styles";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faAppleWhole } from "@fortawesome/free-solid-svg-icons";
import { withAuth } from "../components/withAuth";
import { withAdmin } from "../components/withAdmin";

const profile = ({ user }) => {
  const router = useRouter();
  const { handleLogOut, isDarkMode, handleContextChange, setIsDarkMode } =
    useContext(AuthContext);

  const logout = () => {
    handleLogOut();
  };

  useEffect(() => {
    getTheme();
  }, []);

  const handleChangeProfilePicture = () => {
    console.log("hola");
  };

  const handleChangePassword = () => {
    router.push("/auth/password/forgot");
  };

  const handleGiveAccess = () => {
    console.log("implement");
  };

  const setTheme = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_NAME}/user/theme/${user._id}`,
        {
          theme: isDarkMode ? 1 : 0,
        }
      );
      setIsDarkMode(response.data.theme === 0 ? true : false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTheme = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_NAME}/user/theme/${user._id}`
      );
      console.log("tema actual, ", response.data.theme);
      setIsDarkMode(response.data.theme === 0 ? true : false);
      handleContextChange();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTheme = () => {
    setTheme();
    handleContextChange();
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
          <div
            className={`${layoutStyles.themeSwitch} ${
              isDarkMode ? layoutStyles.darkMode : ""
            }`}
            onClick={handleTheme}
          >
            <div className={layoutStyles.slider} />
          </div>
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
      </div>

      <div className={profileStyles.containers}>
        <button className={profileStyles.change} onClick={handleChangePassword}>
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
