import { loginStyles } from "../../../styles";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
const ForgotPassword = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Send Email",
  });
  const { email, password, error, success, buttonText } = state;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      buttonText: "Send email",
    });

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_NAME}/forgot-password`,
        {
          email,
        }
      );

      setState({
        ...state,
        name: "",
        email: "",
        password: "",
        error: "",
        success: "",
        buttonText: "Submitted",
        success: response.data.message,
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Send Email",
        error: error.response.data.error,
      });
    }
  };
  const handleChange = (origen) => (e) => {
    setState({
      ...state,
      [origen]: e.target.value,
      error: "",
      success: "",
    });
  };
  return (
    <>
      <div className={loginStyles.container}>
        <img
          className={loginStyles.imgLogo}
          src="/images/logos/logo512.png"
          alt="Gewi Logo"
        />
        <form className={loginStyles.form} onSubmit={handleResetPassword}>
          {error && <div className={loginStyles.error}>{error}</div>}
          <h2>{success && success}</h2>
          <h2>{error && error}</h2>

          <label className={loginStyles.label} htmlFor="email">
            Enter your email to reset your password:
          </label>
          <input
            className={loginStyles.input}
            type="email"
            id="email"
            value={email}
            onChange={handleChange("email")}
          />

          <button className={loginStyles.button} type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
