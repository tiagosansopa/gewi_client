import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { profileStyles } from "../styles";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faAppleWhole } from "@fortawesome/free-solid-svg-icons";
import { contacts } from "../dummy";
import { GoogleLogin } from "react-google-login";
import AppleLogin from "react-apple-login";
import { withAuth } from "../components/withAuth";
import { withAdmin } from "../components/withAdmin";

const profile = () => {
  const router = useRouter();
  const { user, handleLogOut } = useContext(AuthContext);
  const [showContactList, setShowContactList] = useState(false);

  const logout = () => {
    handleLogOut();
  };

  const handleChangeProfilePicture = () => {
    console.log("hola");
  };

  const handleContactClick = (contact) => {
    // Handle contact click
  };

  const handleGiveAccess = () => {
    console.log("implement");
  };

  const handleGoogleLoginSuccess = (response) => {
    // Handle successful Google login here
    console.log("Google login successful:", response);
    // Set user as logged in
    setUserLoggedIn(response.accessToken);
    // Redirect to the dashboard or perform any other necessary actions
    router.push("/home");
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle Google login failure/error here
    console.error("Google login failed:", error);
    // Display an error message or perform any other necessary actions
  };

  const handleAppleLoginSuccess = (response) => {
    // Handle successful Apple ID login here
    console.log("Apple ID login successful:", response);
    // Set user as logged in
    setUserLoggedIn(response.authorization.id_token);
    // Redirect to the dashboard or perform any other necessary actions
    router.push("/home");
  };

  const handleAppleLoginFailure = (error) => {
    // Handle Apple ID login failure/error here
    console.error("Apple ID login failed:", error);
    // Display an error message or perform any other necessary actions
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
      </div>

      <div className={profileStyles.containers}>
        <button className={profileStyles.change} onClick={handleGiveAccess}>
          Change Password
        </button>
        <GoogleLogin
          clientId="86329728024-ib082hcocqake15h1vad5353i12sd1bu.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy="single_host_origin"
        />
        <AppleLogin
          clientId="YOUR_APPLE_CLIENT_ID"
          redirectURI="YOUR_APPLE_REDIRECT_URI"
          onSuccess={handleAppleLoginSuccess}
          onFailure={handleAppleLoginFailure}
          render={(props) => (
            <button className={profileStyles.change} onClick={props.onClick}>
              <div>
                <FontAwesomeIcon icon={faAppleWhole} />
              </div>
              <div>Log in with Apple</div>
            </button>
          )}
        />
        <button className={profileStyles.change} onClick={logout}>
          Log Out
        </button>
        {showContactList && (
          <ul className={profileStyles.contactList}>
            {contacts.map((contact) => (
              <li
                key={contact.id}
                className={profileStyles.contact}
                onClick={() => handleContactClick(contact)}
              >
                {contact.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = withAuth();
export default profile;
