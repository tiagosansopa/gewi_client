import { keyStyles } from "../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadCry, faAtlas } from "@fortawesome/free-solid-svg-icons";
const Error = () => {
  return (
    <div className={keyStyles.container}>
      <div className={keyStyles.qr}>
        <h1>ERROR</h1>
        <FontAwesomeIcon icon={faSadCry} className={keyStyles.qrIcon} />
        <FontAwesomeIcon icon={faAtlas} className={keyStyles.qrIcon} />
        <p>you fell out of gewi!</p>
      </div>
    </div>
  );
};

export default Error;
