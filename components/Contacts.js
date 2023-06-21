import { useState, useEffect, useContext } from "react";
import { contactsStyles } from "../styles";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Contacts = ({ setContact }) => {
  const [contactList, SetContactList] = useState([]);
  const { user } = useContext(AuthContext);
  const getContacts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_NAME}/contacts/${user._id}`
      );
      console.log("los contactos del user son:", response.data.contacts);
      SetContactList(response.data.contacts);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className={contactsStyles.container}>
      <ul className={contactsStyles.list}>
        {contactList.map((contact, index) => {
          return (
            <li
              key={index}
              className={contactsStyles.item}
              onClick={() => {
                setContact(contact);
              }}
            >
              {/*<img src={contact.img} alt="user image" />*/}
              <div className={contactsStyles.messageContent}>
                <span>{contact.name}</span>
                <p>{contact.lastName}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Contacts;
