import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div className={accessStyles.amenities}>
      <div className={accessStyles.photos}>
        <div className={accessStyles.photoscontainerWrap}>
          <div
            key={item.id}
            className={`${accessStyles.photoscontainer} ${
              item.type === "personal" && accessStyles.personal
            }
            ${item.type === "car" && accessStyles.car} ${
              item.type === "heli" && accessStyles.heli
            }`}
          >
            <img src={item.thumbnail} />
            <p>{item.place}</p>
            <p>{item.dateTime}</p>
            {item.type === "personal" && (
              <FontAwesomeIcon icon={faPersonRunning} />
            )}
            {item.type === "car" && <FontAwesomeIcon icon={faCar} />}
            {item.type === "heli" && <FontAwesomeIcon icon={faHelicopter} />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default QR;
