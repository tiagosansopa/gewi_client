import { useEffect, useState } from "react";
import { accessStyles } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { authenticate, isAuth } from "../../helpers/auth";
import { useRouter } from "next/router";
import { vigentesData, solicitadosData } from "../../dummy";

const Access = () => {
  const router = useRouter();
  const [showVigentes, setShowVigentes] = useState(false);
  const [showSolicitados, setShowSolicitados] = useState(false);

  useEffect(() => {
    if (!isAuth()) router.push("/login");
  }, []);

  const handleVigentesClick = () => {
    setShowVigentes(!showVigentes);
  };

  const handleSolicitadosClick = () => {
    setShowSolicitados(!showSolicitados);
  };

  const handleNuevoClick = () => {
    router.push("/access/new");
  };

  return (
    <div className={accessStyles.container}>
      <h1 className={accessStyles.title}>Accesos</h1>
      <div className={accessStyles.buttonsContainer}>
        <button className={accessStyles.button} onClick={handleVigentesClick}>
          Vigentes
        </button>
        <button
          className={accessStyles.button}
          onClick={handleSolicitadosClick}
        >
          Solicitados
        </button>
        <button className={accessStyles.button} onClick={handleNuevoClick}>
          Nuevo <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {showVigentes && (
        <div className={accessStyles.listContainer}>
          <h2 className={accessStyles.listTitle}>Vigentes</h2>
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
        </div>
      )}
      {showSolicitados && (
        <div className={accessStyles.listContainer}>
          <h2 className={accessStyles.listTitle}>Solicitados</h2>
          <ul className={accessStyles.list}>
            {solicitadosData.map((item, index) => (
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
        </div>
      )}
    </div>
  );
};
export default Access;
