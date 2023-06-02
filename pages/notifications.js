import { notificationsStyles } from "../styles";
import { contacts, DUMMY_PROFILE } from "../dummy";

const Notifications = () => {
  return (
    <div className={notificationsStyles.container}>
      <div>
        <h1>Notifications</h1>
      </div>
      <div className={notificationsStyles.notifications}>
        {DUMMY_PROFILE.notifications.map((notification) => (
          <div
            key={notification.id}
            className={notificationsStyles.notification}
          >
            <h1>{notification.title}</h1>
            <h5>{notification.hour}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
