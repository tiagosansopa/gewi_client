import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { chatStyles } from "../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { DUMMY_MESSAGES } from "../dummy";

const Chat = () => {
  const { chat } = useContext(AuthContext);
  return (
    <div className={chatStyles.container}>
      <div className={chatStyles.messageHeader}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => setSelectedMessage(null)}
        />
        <img src={chat.img} alt="Message Icon" />
        <h2>{chat.title}</h2>
      </div>
      <div className={chatStyles.container}>
        <ul className={chatStyles.messagePreviewList}>
          {DUMMY_MESSAGES.map((message) => (
            <li
              key={message.id}
              className={`${chatStyles.messagePreview} `}
              onClick={() => handleSelectMessage(message)}
            >
              <div className={chatStyles.messageContent}>
                <span>{message.title}</span>
                <p>{message.preview}</p>
                <p>{message.date}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className={chatStyles.textareaChat}>
          <textarea></textarea>
          <button>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
