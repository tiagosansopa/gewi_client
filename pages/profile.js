import { useState, useEffect } from "react";
import { profileStyles } from "../styles";
import { useRouter } from "next/router";
import { isAuth } from "../helpers/auth";
import { contacts } from "../dummy";
const profile = () => {
  const router = useRouter();
  useEffect(() => {
    if (!isAuth()) router.push("/login");
  }, []);
  const [showContactList, setShowContactList] = useState(false);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleChangeProfilePicture = () => {
    // Handle changing profile picture
  };

  const handleContactClick = (contact) => {
    // Handle contact click
  };

  const handleGiveAccess = () => {
    setShowContactList(true);
  };
  return (
    <div className={profileStyles.profile}>
      <img
        className={profileStyles.profilePicture}
        src="/images/temp/pm1.jpg"
        alt="Profile Picture"
      />
      <button
        className={profileStyles.changePictureButton}
        onClick={handleChangeProfilePicture}
      >
        Change Profile Picture
      </button>
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
  );
};

export default profile;
