import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { withAuth } from "../components/withAuth";
import { amenityStyles } from "../styles";
import { useRouter } from "next/router";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSpaghettiMonsterFlying,
  faBirthdayCake,
  faPersonBreastfeeding,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

const Amenity = () => {
  const router = useRouter();
  const { amenity, setAmenity, handleContextChange } = useContext(AuthContext);
  const [amenityList, setSetAmenityList] = useState([]);

  const getAmenities = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_NAME}/amenities`
      );
      setSetAmenityList(response.data.amenities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAmenities();
  }, []);

  useEffect(() => {
    // Check if the name is empty, and if so, perform an action (e.g., fetch data, display a message)
    if (amenity.id) {
      handleContextChange();
      router.push("/book");
    }

    //
  }, [amenity.id]);

  const handleAmenity = (amenity) => {
    setAmenity(amenity);
  };

  return (
    <div className={amenityStyles.container}>
      <div className={amenityStyles.messageHeader}>
        <div className={amenityStyles.leftArrow}>
          <FontAwesomeIcon icon={faArrowLeft} onClick={() => router.back()} />
        </div>
        <div className={amenityStyles.header}>
          <h1>Amenidades</h1>
        </div>
      </div>

      <div className={amenityStyles.amenityContainer}>
        {amenityList.map((item) => {
          return (
            <div
              className={amenityStyles.photoscontainerWrap}
              onClick={() => {
                handleAmenity(item);
              }}
            >
              <div key={item.id} className={amenityStyles.photoscontainer}>
                <h3>{item.name}</h3>
                <img src={item.img} className={amenityStyles.imgShadow} />
                <p>
                  {item.weekdays.map((day) => {
                    return <span> {day}, </span>;
                  })}
                  {item.schedule.open} - {item.schedule.close}
                  <span>
                    <FontAwesomeIcon icon={faPeopleGroup} />
                  </span>
                  {item.capacity}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export const getServerSideProps = withAuth();
export default Amenity;
