import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isAuth } from "../helpers/auth";
const Index = () => {
  const router = useRouter();
  useEffect(() => {
    !isAuth() ? router.push("/login") : router.push("/home");
  }, []);

  return (
    <div>
      <h1>Bienvenido a Gewi</h1>
    </div>
  );
};

export default Index;
