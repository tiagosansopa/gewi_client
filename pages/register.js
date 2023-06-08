import { regStyles } from "../styles";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { isAuth } from "../helpers/auth";

const Register = () => {
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Register",
  });

  const { name, email, password, error, success, buttonText } = state;

  useEffect(() => {
    console.log("que pasa");
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
    console.table({ name, email, password });
    setState({
      ...state,
      buttonText: "Registering",
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/register`,
        {
          name: name,
          email: email,
          password,
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
      setState({
        ...state,
        buttonText: "Register",
        error: error.response.data.error,
      });
    }
  };

  return (
    <div className={regStyles.container}>
      <img
        className={regStyles.imgLogo}
        src="/images/logos/logo512.png"
        alt="Gewi Logo"
      />
      <h2>{success && success}</h2>
      <h2>{error && error}</h2>

      <form className={regStyles.form} onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label className={regStyles.label} htmlFor="email">
          Name:
        </label>
        <input
          className={regStyles.input}
          type="text"
          id="name"
          value={name}
          onChange={handleChange("name")}
        />
        <label className={regStyles.label} htmlFor="email">
          Email:
        </label>
        <input
          className={regStyles.input}
          type="email"
          id="email"
          value={email}
          onChange={handleChange("email")}
        />
        <label className={regStyles.label} htmlFor="email">
          Password:
        </label>
        <input
          className={regStyles.input}
          type="password"
          id="password"
          value={password}
          onChange={handleChange("password")}
        />
        <button className={regStyles.button} type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default Register;
