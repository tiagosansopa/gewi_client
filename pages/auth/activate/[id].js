import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";

const ActivateAccount = () => {
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    token: "",
    buttonText: "Activate Account",
    success: "",
    error: "",
  });

  const { name, token, buttonText, success, error } = state;

  useEffect(() => {
    let token = router.query.id;
    if (token) {
      const { name } = jwt.decode(token);
      setState({
        ...state,
        name,
        token,
      });
    }
  }, [router]);

  const clickSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Activating" });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/register/activate`,
        { token }
      );
      setState({
        ...state,
        name: "",
        token: "",
        buttonText: "Activated",
        success: response.data.message,
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: "Activate Account",
        error: error.response.data.error,
      });
    }
  };

  return (
    <div>
      <h1>Ready to activate your account {name} ? </h1>
      <h2>{success && success}</h2>
      <h2>{error && error}</h2>
      <button onClick={clickSubmit}>{buttonText}</button>
    </div>
  );
};

export default ActivateAccount;
