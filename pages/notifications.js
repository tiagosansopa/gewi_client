import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { notificationsStyles } from "../styles";
import { useRouter } from "next/router";
import { isAuth } from "../helpers/auth";
import { contacts, DUMMY_PROFILE } from "../dummy";

import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const getChats = async (user) => {
    console.log("El usuario actual es: ", user._id);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/notification`,
        {
          user,
        }
      );
      setNotifications(response.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userI = isAuth();
    if (!userI) router.push("/login");
    getChats(userI);
  }, []);

  return (
    <div className={notificationsStyles.container}>
      <div>
        <h1>Notifications</h1>
      </div>
      <div className={notificationsStyles.notifications}>
        {notifications.map((notification) => (
          <div
            key={notification.content}
            className={notificationsStyles.notification}
          >
            <h4>{notification.content}</h4>
            <h5>{notification.hour}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
