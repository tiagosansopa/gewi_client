import { useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { profileStyles } from "../styles";
import { useRouter } from "next/router";
import { isAuth } from "../helpers/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { contacts, DUMMY_PROFILE } from "../dummy";
const profile = () => {
  const router = useRouter();
  const [showContactList, setShowContactList] = useState(false);

  useEffect(() => {
    if (!isAuth()) router.push("/login");
  }, []);

  const handleChangeProfilePicture = () => {
    console.log("hola");
  };

  const handleContactClick = (contact) => {
    // Handle contact click
  };

  const handleGiveAccess = () => {
    setShowContactList(true);
  };
  return (
    <div className={profileStyles.container}>
      <div className={profileStyles.header}>
        <div>
          <img
            className={profileStyles.profilePicture}
            src="/images/temp/pm1.jpg"
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
          <h1>{DUMMY_PROFILE.name}</h1>
          <h2>{DUMMY_PROFILE.email}</h2>
        </div>
      </div>

      <div className={profileStyles.container}>
        <button
          className={profileStyles.giveAccessButton}
          onClick={handleGiveAccess}
        >
          Give Access
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

export default profile;
