import { useEffect, useState, useContext } from "react";
import { withAuth } from "../../components/withAuth";
import AuthContext from "../../context/AuthContext";
import { chatStyles } from "../../styles";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Messages = ({ user }) => {
  const router = useRouter();
  const [showContactList, setShowContactList] = useState(false);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);

  const { setChat } = useContext(AuthContext);

  const getChats = async (user) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/chats`,
        {
          receiverId: user._id,
        }
      );
      setMessages(response.data.lastMessages);
    } catch (error) {
      console.log(error);
    }
  };

  const getContacts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_NAME}/properties`
      );
      setContacts(response.data.properties);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectMessage = (message) => {
    setChat(message.sender);
    router.push("/chat");
  };

  const handleNewMessage = () => {
    getContacts();
    setShowContactList(true);
  };

  const handleContactClick = (message) => {
    //setChat(user);
    router.push("/chat");
  };

  useEffect(() => {
    getChats(user);
  }, []);

  return (
    <div className={chatStyles.container}>
      <ul className={chatStyles.messagePreviewList}>
        {messages.map((message) => {
          const specificDate = new Date(message.createdAt);
          const currentDate = new Date();

          const timeDifference = currentDate - specificDate;
          const timeInSeconds = Math.floor(timeDifference / 1000);

          let timeString = "";
          let timeDimensional = "";

          if (timeInSeconds < 60) {
            timeString = timeInSeconds.toString();
            timeDimensional = "seconds";
          } else if (timeInSeconds < 3600) {
            const minutes = Math.floor(timeInSeconds / 60);
            timeString = minutes.toString();
            timeDimensional = "minutes";
          } else if (timeInSeconds < 86400) {
            const hours = Math.floor(timeInSeconds / 3600);
            timeString = hours.toString();
            timeDimensional = "hours";
          } else if (timeInSeconds < 2592000) {
            const days = Math.floor(timeInSeconds / 86400);
            timeString = days.toString();
            timeDimensional = "days";
          } else if (timeInSeconds < 31536000) {
            const months = Math.floor(timeInSeconds / 2592000);
            timeString = months.toString();
            timeDimensional = "months";
          } else {
            const years = Math.floor(timeInSeconds / 31536000);
            timeString = years.toString();
            timeDimensional = "years";
          }

          const formattedString = `${timeString} ${timeDimensional} ago`;
          //console.log("Time since specific date:", formattedString);
          return (
            <li
              key={message.id}
              className={`${chatStyles.messagePreview} `}
              onClick={() => handleSelectMessage(message)}
            >
              <img src={message.sender.img} alt="Message Icon" />
              <div className={chatStyles.messageContent}>
                <span>{message.sender.name}</span>
                <p>{message.message}</p>
              </div>
              <p>{formattedString}</p>
            </li>
          );
        })}
      </ul>
      <button className={chatStyles.button} onClick={handleNewMessage}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};
export const getServerSideProps = withAuth();
export default Messages;
