import { useState } from "react";
import { useRouter } from "next/router";
import { keyStyles } from "../../styles";
import axios from "axios";
const Key = ({ access }) => {
  const router = useRouter();
  const updateContact = async (contactUpdated) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/contact/valid`,
        contactUpdated
      );

      console.log(response.data.message);
      router.push(`/key/${response.data.contactId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleValidate = () => {
    //validar que el ID image es valido...
    const contactUpdated = {
      name: "hola",
    };
    updateContact(contactUpdated);
  };

  return (
    <div className={keyStyles.container}>
      <div>
        <p>{access.property.name}</p>
        <div>
          <p>
            {access.start} -- {access.finish}
          </p>
        </div>
      </div>
      <form onSubmit={handleValidate} className={keyStyles.form}>
        <label>Nombre</label>
        <input value={access.contact.name}></input>
        <label>Apellido</label>
        <input value={access.contact.lastName}></input>
        <label>Telefono</label>
        <input value={access.contact.phone}></input>
        <label>Numero de ID</label>
        <input></input>
        <label>Tipo de ID</label>
        <input></input>
        <label>SUBIR IMAGEN DE ID</label>
        <button>SUBIR</button>
      </form>
    </div>
  );
};

export default Key;

export async function getServerSideProps({ query }) {
  console.log("query");
  console.log(query.id);
  let access;
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_NAME}/key`,
      { id: query.id }
    );
    access = response.data.access;
    if (access.status === 1) {
      return {
        redirect: {
          destination: "/key",
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.log(error.response.data.error);
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }

  return {
    props: {
      access,
    },
  };
}
