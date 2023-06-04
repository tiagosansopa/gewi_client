import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpaghettiMonsterFlying } from "@fortawesome/free-solid-svg-icons";
import { homeStyles } from "../styles";
import { useRouter } from "next/router";
import { isAuth } from "../helpers/auth";

import axios from "axios";

import { DUMMY_MESSAGES, DUMMY_AMENITIES } from "../dummy";

const Home = () => {
  const router = useRouter();
  const { setChat, setAmenity } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  const getChats = async (user) => {
    console.log("El usuario actual es: ", user._id);
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

  useEffect(() => {
    const userI = isAuth();
    if (!userI) router.push("/login");
    getChats(userI);
  }, []);

  const handleSelectMessage = (message) => {
    setChat(message);
    router.push("/chat");
  };

  const handleAmenity = (amenity) => {
    setAmenity(amenity);
    router.push("/amenity");
  };
  return (
    <div className={homeStyles.container}>
      <div className={homeStyles.amenities}>
        <div className={homeStyles.photos}>
          {DUMMY_AMENITIES.map((item) => {
            return (
              <div
                className={homeStyles.photoscontainerWrap}
                onClick={() => {
                  handleAmenity(item);
                }}
              >
                <div key={item.id} className={homeStyles.photoscontainer}>
                  <p>{item.name}</p>
                  <img src={item.img} />
                  <p>
                    Open from: {item.schedule.open} to: {item.schedule.close}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ul className={homeStyles.messagePreviewList}>
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
          console.log("Time since specific date:", formattedString);
          return (
            <li
              key={message.id}
              className={`${homeStyles.messagePreview} `}
              onClick={() => handleSelectMessage(message)}
            >
              <img src={message.sender.img} alt="Message Icon" />
              <div className={homeStyles.messageContent}>
                <span>{message.sender.name}</span>
                <p>{message.message}</p>
              </div>
              <p>{formattedString}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Home;
