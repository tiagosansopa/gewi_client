import { useState, useEffect } from "react";
import { profileStyles } from "../styles";
const profile = () => {
  const [showContactList, setShowContactList] = useState(false);

  // Render contact list
  // Replace this with your own implementation to fetch and render the user's contact list
  const contacts = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Johnson" },
  ];
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
