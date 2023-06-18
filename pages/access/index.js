import { useEffect, useState, useContext } from "react";
import { accessStyles } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { withAuth } from "../../components/withAuth";
import {
  faPlus,
  faCar,
  faPersonRunning,
  faHelicopter,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { solicitadosData } from "../../dummy";

const Access = () => {
  const router = useRouter();
  const [vigentes, setVigentes] = useState([]);
  const { setQrDetail } = useContext(AuthContext);

  const getVigentes = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_NAME}/access`
      );
      setVigentes(response.data.accesses);
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    getVigentes();
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
      <div className={accessStyles.amenities}>
        <div className={accessStyles.photos}>
          {vigentes.map((item) => {
            return (
              <div
                className={accessStyles.photoscontainerWrap}
                onClick={() => {
                  handleDetail(item);
                }}
                key={item.id}
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
      <h2 className={accessStyles.title}>Otorgados</h2>
      <div className={accessStyles.listContainer}>
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
export const getServerSideProps = withAuth();
export default Access;
