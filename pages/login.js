import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";
import AppleLogin from "react-apple-login";
import axios from "axios";
import Link from "next/link";
import { loginStyles } from "../styles";
import { authenticate, isAuth } from "../helpers/auth";

const Login = () => {
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Login",
  });

  const { email, password, error, success, buttonText } = state;

  useEffect(() => {
    const isLoggedIn = checkIfUserIsLoggedIn();
    if (isLoggedIn) {
      router.push("/");
    }
  }, []);

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

      authenticate(response, () =>
        isAuth() && isAuth().role === "admin"
          ? router.push("/admin")
          : router.push("/user")
      );
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Perform login logic with email and password
      // Replace with your own authentication code
      const response = await axios.post("/api/login", { email, password });
      // Set user as logged in
      setUserLoggedIn(response.data.token);
      // Redirect to the dashboard or perform any other necessary actions
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const checkIfUserIsLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const setUserLoggedIn = (token) => {
    localStorage.setItem("token", token);
  };

  const handleGoogleLoginSuccess = (response) => {
    // Handle successful Google login here
    console.log("Google login successful:", response);
    // Set user as logged in
    setUserLoggedIn(response.accessToken);
    // Redirect to the dashboard or perform any other necessary actions
    router.push("/home");
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle Google login failure/error here
    console.error("Google login failed:", error);
    // Display an error message or perform any other necessary actions
  };

  const handleAppleLoginSuccess = (response) => {
    // Handle successful Apple ID login here
    console.log("Apple ID login successful:", response);
    // Set user as logged in
    setUserLoggedIn(response.authorization.id_token);
    // Redirect to the dashboard or perform any other necessary actions
    router.push("/home");
  };

  const handleAppleLoginFailure = (error) => {
    // Handle Apple ID login failure/error here
    console.error("Apple ID login failed:", error);
    // Display an error message or perform any other necessary actions
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
      <div className={loginStyles.buttonContainer}>
        <h3 className={loginStyles.label}>or</h3>
        <GoogleLogin
          clientId="86329728024-ib082hcocqake15h1vad5353i12sd1bu.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy="single_host_origin"
        />
        <AppleLogin
          clientId="YOUR_APPLE_CLIENT_ID"
          redirectURI="YOUR_APPLE_REDIRECT_URI"
          onSuccess={handleAppleLoginSuccess}
          onFailure={handleAppleLoginFailure}
          render={(props) => (
            <button className={loginStyles.appleButton} onClick={props.onClick}>
              Log in with Apple
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default Login;
