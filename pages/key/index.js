import { keyStyles } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
const GewiKey = () => {
  return (
    <div className={keyStyles.container}>
      <div className={keyStyles.qr}>
        <FontAwesomeIcon icon={faQrcode} className={keyStyles.qrIcon} />
      </div>
    </div>
  );
};

export default GewiKey;
