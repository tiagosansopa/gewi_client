import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withAuth } from "../../components/withAuth";
import {
  faPlus,
  faCar,
  faPersonRunning,
  faHelicopter,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/AuthContext";
import { accessStyles } from "../../styles";
import { useRouter } from "next/router";

const QR = () => {
  const { qrDetail: item } = useContext(AuthContext);
  const router = useRouter();
  return (
    <div className={accessStyles.qrFocus}>
      <div key={item.id} className={accessStyles.qr}>
        <img src={item.thumbnail} />
        <p>{item.place}</p>
        <p>{item.dateTime}</p>
        {item.type === "personal" && <FontAwesomeIcon icon={faPersonRunning} />}
        {item.type === "car" && <FontAwesomeIcon icon={faCar} />}
        {item.type === "heli" && <FontAwesomeIcon icon={faHelicopter} />}
      </div>
    </div>
  );
};
export const getServerSideProps = withAuth();
export default QR;
