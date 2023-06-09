import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { loginStyles } from "../styles";
import AuthContext from "../context/AuthContext";
import { authenticate, isAuth } from "../helpers/auth";
import { notAuth } from "../components/notAuth";
const Login = () => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Login",
  });

  const { email, password, error, success, buttonText } = state;

  const handleChange = (origen) => (e) => {
    setState({
      ...state,
      [origen]: e.target.value,
      error: "",
      success: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table({ email, password });
    setState({
      ...state,
      buttonText: "Logging in...",
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/login`,
        {
          email: email,
          password,
        }
      );

      authenticate(response, () => {
        setUser(response.data.user);
        isAuth() && isAuth().role === "admin"
          ? router.push("/admin")
          : router.push("/");
      });
      setState({
        ...state,
        name: "",
        email: "",
        password: "",
        error: "",
        success: "",
        buttonText: "Submitted",
        success: response.data.token,
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: "LogIn",
        error: error.response.data.error,
      });
    }
  };

  const setUserLoggedIn = (token) => {
    localStorage.setItem("token", token);
  };

  return (
    <div className={loginStyles.container}>
      <img
        className={loginStyles.imgLogo}
        src="/images/logos/logo512.png"
        alt="Gewi Logo"
      />
      <form className={loginStyles.form} onSubmit={handleSubmit}>
        {error && <div className={loginStyles.error}>{error}</div>}
        <h2>{success && success}</h2>
        <h2>{error && error}</h2>

        <label className={loginStyles.label} htmlFor="email">
          Email:
        </label>
        <input
          className={loginStyles.input}
          type="email"
          id="email"
          value={email}
          onChange={handleChange("email")}
        />
        <label className={loginStyles.label} htmlFor="password">
          Password:
        </label>
        <input
          className={loginStyles.input}
          type="password"
          id="password"
          value={password}
          onChange={handleChange("password")}
        />
        <button className={loginStyles.button} type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
};
export const getServerSideProps = notAuth();
export default Login;
