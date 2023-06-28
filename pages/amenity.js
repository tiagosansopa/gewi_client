import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { withAuth } from "../components/withAuth";
import { amenityStyles } from "../styles";
import { useRouter } from "next/router";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

import { faStar as solidStar } from "@fortawesome/free-regular-svg-icons";

const Amenity = ({ user }) => {
  const router = useRouter();
  const { amenity, setAmenity, handleContextChange } = useContext(AuthContext);
  const [amenityList, setSetAmenityList] = useState([]);
  const [favAmenityList, setFavAmenityList] = useState(user.amenities);

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
    console.log("hola", user.amenities);
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

  const sendFav = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_NAME}/user/amenities/${user._id}`,
        {
          updatedData: id,
        }
      );

      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFav = (id) => {
    console.log("enviar fav", id);
    console.log(user._id);
    sendFav(id);
  };

  return (
    <div className={amenityStyles.container}>
      <h1 className={amenityStyles.header}>Amenidades</h1>
      <div className={amenityStyles.amenityContainer}>
        {amenityList.map((item) => {
          return (
            <div className={amenityStyles.photoscontainerWrap}>
              <div key={item.id} className={amenityStyles.photoscontainer}>
                <div
                  onClick={() => {
                    handleFav(item._id);
                  }}
                  className={amenityStyles.star}
                >
                  {favAmenityList.includes(item._id) ? (
                    <FontAwesomeIcon icon={faStar} />
                  ) : (
                    <FontAwesomeIcon icon={solidStar} />
                  )}
                </div>
                <img
                  src={item.img}
                  onClick={() => {
                    handleAmenity(item);
                  }}
                  className={amenityStyles.imgShadow}
                />
                <div className={amenityStyles.amenityFoot}>
                  <p>
                    {item.weekdays.map((day) => {
                      return <span> {day}, </span>;
                    })}
                    {item.schedule.open} - {item.schedule.close}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPeopleGroup} />

                    {item.capacity}
                  </p>
                </div>
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
