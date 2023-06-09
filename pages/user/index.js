import { getCookie } from "../../helpers/auth";
import axios from "axios";

const User = ({ user }) => {
  return (
    <div>
      <h1>Bienvenido a GEWI {user.name}</h1>
    </div>
  );
};

User.getInitialProps = async (context) => {
  const token = getCookie("token", context.req);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_NAME}/user`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          contentType: "application/json",
        },
      }
    );
    console.log(response.data);
    return { user: response.data };
  } catch (error) {
    if (error.response.status === 401) {
      return { user: "no user" };
    }
  }
};

export default User;
