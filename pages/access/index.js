import { useEffect, useState, useContext } from "react";
import { accessStyles } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../context/AuthContext";
import {
  faPlus,
  faCar,
  faPersonRunning,
  faHelicopter,
} from "@fortawesome/free-solid-svg-icons";
import { authenticate, isAuth } from "../../helpers/auth";
import { useRouter } from "next/router";
import { vigentesData, solicitadosData } from "../../dummy";

const Access = () => {
  const router = useRouter();
  const [showSolicitados, setShowSolicitados] = useState(false);
  const { setQrDetail } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuth()) router.push("/login");
  }, []);

  const handleDetail = (item) => {
    setQrDetail(item);
    router.push("/access/qr");
  };

  const handleNuevoClick = () => {
    router.push("/access/new");
  };

  return (
    <div className={accessStyles.container}>
      <h2 className={accessStyles.title}>Mis Accessos</h2>
      <div className={accessStyles.amenities}>
        <div className={accessStyles.photos}>
          {vigentesData.map((item) => {
            return (
              <div
                className={accessStyles.photoscontainerWrap}
                onClick={() => {
                  handleDetail(item);
                }}
              >
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
                  {item.type === "heli" && (
                    <FontAwesomeIcon icon={faHelicopter} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className={accessStyles.listContainer}>
        <ul className={accessStyles.list}>
          {vigentesData.map((item, index) => (
            <li key={index} className={accessStyles.listItem}>
              <img
                className={accessStyles.thumbnail}
                src={item.thumbnail}
                alt={`Thumbnail ${index + 1}`}
              />
              <div className={accessStyles.details}>
                <h3 className={accessStyles.place}>{item.place}</h3>
                <p className={accessStyles.dateTime}>{item.dateTime}</p>
                <p className={accessStyles.type}>{item.type}</p>
              </div>
            </li>
          ))}
        </ul>
      </div> */}
      <div className={accessStyles.listContainer}>
        <h2 className={accessStyles.title}>Otorgados</h2>
        <ul className={accessStyles.list}>
          {solicitadosData.map((item, index) => (
            <li key={index} className={accessStyles.listItem}>
              <img className={accessStyles.thumbnail} src={item.thumbnail} />
              <div className={accessStyles.details}>
                <h3 className={accessStyles.place}>{item.user}</h3>
                <p className={accessStyles.dateTime}>{item.place}</p>
                <p className={accessStyles.dateTime}>{item.dateTime}</p>
                {item.type === "personal" && (
                  <FontAwesomeIcon icon={faPersonRunning} />
                )}
                {item.type === "car" && <FontAwesomeIcon icon={faCar} />}
                {item.type === "heli" && (
                  <FontAwesomeIcon icon={faHelicopter} />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={accessStyles.buttonsContainer}>
        <button className={accessStyles.button} onClick={handleNuevoClick}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};
export default Access;
