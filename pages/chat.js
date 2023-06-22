import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { withAuth } from "../components/withAuth";
import { chatStyles } from "../styles";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const Chat = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const { chat, user } = useContext(AuthContext);

  const getChats = async () => {
    console.log(`El chat es entre ${user._id} y ${chat._id}`);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/chat`,
        {
          senderId: chat._id,
          receiverId: user._id,
        }
      );
      console.log(response);
      setMessages(response.data.chat);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (e) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/send`,
        {
          sender: user._id,
          receiver: chat._id,
          message: text,
        }
      );
      setText("");
      getChats();
    } catch (error) {
      console.log("Error sending message");
    }
  };
  const handleText = (e) => setText(e.target.value);

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className={chatStyles.container}>
      <div className={chatStyles.messageHeader}>
        <div className={chatStyles.header}>
          <img src={chat.img} alt="Message Icon" />
          <h2>{chat.name}</h2>
        </div>
      </div>

      <div className={chatStyles.messagesChat}>
        {messages.map((message) => {
          return (
            <>
              {message.receiver === user._id ? (
                <>
                  <div
                    key={message.message}
                    className={`${chatStyles.message}  `}
                  >
                    <p className={chatStyles.messageText}>{message.message}</p>
                  </div>
                  <p className={chatStyles.time}>
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </p>
                </>
              ) : (
                <>
                  <div
                    key={message.message}
                    className={`${chatStyles.message} ${chatStyles.textOnly}`}
                  >
                    <div className={` ${chatStyles.response} `}>
                      <p
                        className={` ${chatStyles.messageText} ${chatStyles.messageTextResponse} `}
                      >
                        {message.message}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`${chatStyles.time} ${chatStyles.responseTime} `}
                  >
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </p>
                </>
              )}
            </>
          );
        })}
      </div>
      <div className={chatStyles.textareaChat}>
        <textarea
          className={chatStyles.writeMessage}
          onChange={handleText}
          value={text}
        ></textarea>
        <button className={chatStyles.send} onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
};
export const getServerSideProps = withAuth();
export default Chat;
