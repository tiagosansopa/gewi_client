import { useEffect, useState, useContext } from "react";
import { withAuth } from "../components/withAuth";
import AuthContext from "../context/AuthContext";
import { homeStyles } from "../styles";
import { useRouter } from "next/router";
import axios from "axios";
const Home = ({ user }) => {
  const router = useRouter();
  const { amenity, setChat, setAmenity, handleContextChange } =
    useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [amenities, setAmenities] = useState([]);

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

  const getAmenities = async (user) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_NAME}/user/amenities/${user._id}`
      );
      setAmenities(response.data.amenities);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChats(user);
    getAmenities(user);
  }, []);

  const handleSelectMessage = (message) => {
    setChat(message.sender);
    router.push("/chat");
  };

  useEffect(() => {
    // Read the state value here
    console.log("Name:", amenity, !amenity._id);

    // Check if the name is empty, and if so, perform an action (e.g., fetch data, display a message)
    if (amenity._id) {
      handleContextChange();
      router.push("/book");
    }

    //
  }, [amenity._id]);

  const handleAmenity = (a) => {
    setAmenity(a);
  };
  const handleGoMessages = () => {
    router.push("/msg");
  };
  return (
    <div className={homeStyles.container}>
      <div className={homeStyles.amenities}>
        <div className={homeStyles.photos}>
          {amenities.map((item) => {
            return (
              <div
                className={homeStyles.photoscontainerWrap}
                onClick={() => {
                  handleAmenity(item);
                  router.push("/book");
                }}
              >
                <div key={item.id} className={homeStyles.photoscontainer}>
                  <img src={item.img} />
                  <p>
                    {item.schedule.open} to: {item.schedule.close}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ul className={homeStyles.messagePreviewList}>
        <button onClick={handleGoMessages} className={homeStyles.allMessage}>
          Go to all
        </button>

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
export const getServerSideProps = withAuth();
export default Home;
