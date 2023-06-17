import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { notAuth } from "../../../../components/notAuth";
import { loginStyles } from "../../../../styles";
const ResetPassword = () => {
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Reset Password",
    success: "",
    error: "",
  });

  const { name, token, newPassword, buttonText, success, error } = state;

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
  const handleChange = (origen) => (e) => {
    setState({
      ...state,
      [origen]: e.target.value,
      error: "",
      success: "",
    });
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Resetting" });
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_NAME}/reset-password`,
        { resetPasswordLink: token, newPassword }
      );
      setState({
        ...state,
        name: "",
        token: "",
        buttonText: "Done",
        success: response.data.message,
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: "Reset Password",
        error: error.response.data.error,
      });
    }
  };

  return (
    <div className={loginStyles.container}>
      <img
        className={loginStyles.imgLogo}
        src="/images/logos/logo512.png"
        alt="Gewi Logo"
      />
      <form className={loginStyles.form} onSubmit={handleResetPassword}>
        <h1>Ready to reset your password {name} ? </h1>
        <h2>{success && success}</h2>
        <h2>{error && error}</h2>
        <label className={loginStyles.label} htmlFor="password">
          Password:
        </label>
        <input
          className={loginStyles.input}
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={handleChange("newPassword")}
        />
        <button className={loginStyles.button} type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
};
export const getServerSideProps = notAuth();
export default ResetPassword;
