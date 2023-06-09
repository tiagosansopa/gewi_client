import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { notificationsStyles } from "../styles";
import { useRouter } from "next/router";
import { withAuth } from "../components/withAuth";
import axios from "axios";

const Notifications = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(AuthContext);

  const getNotifications = async () => {
    console.log("getNotifications from user ", user);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/notification`,
        {
          user: user._id,
        }
      );
      setNotifications(response.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
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
export const getServerSideProps = withAuth();
export default Notifications;
