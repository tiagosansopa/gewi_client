import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isAuth } from "../../helpers/auth";
const Admin = () => {
  const router = useRouter();
  useEffect(() => {
    if (!isAuth()) {
      console.log("Not Auth");
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>Bienvenido a Admin</h1>
    </div>
  );
};

export default Admin;
