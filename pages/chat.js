import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { chatStyles } from "../styles";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { DUMMY_MESSAGES, DUMMY_CHAT } from "../dummy";

const Chat = () => {
  const router = useRouter();
  const { chat } = useContext(AuthContext);
  return (
    <div className={chatStyles.container}>
      <div className={chatStyles.messageHeader}>
        <div className={chatStyles.leftArrow}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => router.push("/home")}
          />
        </div>
        <div className={chatStyles.header}>
          <img src={chat.img} alt="Message Icon" />
          <h2>{chat.title}</h2>
        </div>
      </div>

      <div className={chatStyles.container}>
        <div className={chatStyles.messagesChat}>
          {DUMMY_CHAT.map((message) => {
            return (
              <>
                {message.from === "user" ? (
                  <>
                    <div key={message.id} className={`${chatStyles.message}  `}>
                      <p className={chatStyles.messageText}>
                        {message.content}
                      </p>
                    </div>
                    <p className={chatStyles.time}>{message.date}</p>
                  </>
                ) : (
                  <>
                    <div
                      key={message.id}
                      className={`${chatStyles.message} ${chatStyles.textOnly}`}
                    >
                      <div className={` ${chatStyles.response} `}>
                        <p
                          className={` ${chatStyles.messageText} ${chatStyles.messageTextResponse} `}
                        >
                          {message.content}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`${chatStyles.time} ${chatStyles.responseTime} `}
                    >
                      {message.date}
                    </p>
                  </>
                )}
              </>
            );
          })}
        </div>
        <div className={chatStyles.textareaChat}>
          <textarea className={chatStyles.writeMessage}></textarea>
          <button className={chatStyles.send}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
