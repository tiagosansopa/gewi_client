import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { homeStyles } from "../styles";
import { useRouter } from "next/router";
import { isAuth } from "../helpers/auth";

import { DUMMY_MESSAGES, DUMMY_AMENITIES } from "../dummy";

const Home = () => {
  const router = useRouter();
  const { setChat, setAmenity } = useContext(AuthContext);
  const [messages, setMessages] = useState(DUMMY_MESSAGES);

  useEffect(() => {
    if (!isAuth()) router.push("/login");
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
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ul className={homeStyles.messagePreviewList}>
        {messages.map((message) => (
          <li
            key={message.id}
            className={`${homeStyles.messagePreview} `}
            onClick={() => handleSelectMessage(message)}
          >
            <img src={message.img} alt="Message Icon" />
            <div className={homeStyles.messageContent}>
              <span>{message.title}</span>
              <p>{message.preview}</p>
              <p>{message.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Home;
