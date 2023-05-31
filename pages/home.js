import { useEffect, useState } from "react";
import { homeStyles } from "../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const DUMMY_AMENITIES = [
  {
    id: 1,
    img: "/images/temp/pool.jpg",
    name: "Piscina",
    description: "abierto 8:00 - 19:00",
  },
  {
    id: 2,
    img: "/images/temp/gym.jpg",
    name: "Gimnasio",
    description: "abierto 9:00 - 20:00",
  },
  {
    id: 3,
    img: "/images/temp/garden.jpg",
    name: "Jardin",
    description: "abierto 10:00 - 13:00",
  },
  {
    id: 4,
    img: "/images/temp/pool.jpg",
    name: "Piscina",
    description: "abierto 10:00 - 13:00",
  },
  {
    id: 5,
    img: "/images/temp/gym.jpg",
    name: "Gimnasio",
    description: "temporalmente cerrado",
  },
  {
    id: 6,
    img: "/images/temp/garden.jpg",
    name: "Jardin",
    description: "abierto 10:00 - 19:00",
  },
];

const DUMMY_MESSAGES = [
  {
    id: 1,
    title: "Lost & Found",
    img: "/images/temp/lnf.jpg",
    preview: "Llaves encontradas",
    content: "Llaves encontradas en el parqueo. Recoger en lobby.",
    date: "7:04",
  },
  {
    id: 2,
    title: "Administración",
    img: "/images/temp/lobby.jpg",
    preview: "Reunion mensual",
    content:
      "Proxima reunion de vecinos sera el Miercoles 3 en el salon social.",
    date: "12:15",
  },
  {
    id: 3,
    title: "Luis Sierra",
    img: "/images/temp/man.jpg",
    preview: "Luces encendidas",
    content: "Es suyo el auto con placa 677NGY?",
    date: "3:05",
  },
  {
    id: 4,
    title: "Brenda Lozano",
    img: "/images/temp/woman.jpeg",
    preview: "Paquete",
    content: "Favor dejarme en recepcion el sobre del pago.",
    date: "21:56",
  },
];
const Home = () => {
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [selectedMessage, setSelectedMessage] = useState(null);

  //useEffect(() => {
  //   // Fetch message list from MongoDB Atlas
  //   const fetchMessages = async () => {
  //     try {
  //       const response = await fetch('/api/messages'); // Assuming you have an API route to handle the MongoDB Atlas request
  //       const data = await response.json();
  //       setMessages(data);
  //     } catch (error) {
  //       console.error('Error fetching messages:', error);
  //     }
  //   };

  //   fetchMessages();
  // }, []);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };
  return (
    <div className={homeStyles.container}>
      {!selectedMessage && (
        <>
          <div className={homeStyles.amenities}>
            <h1>Amenidades</h1>
            <div className={homeStyles.photos}>
              {DUMMY_AMENITIES.map((item) => {
                return (
                  <div className={homeStyles.photoscontainerWrap}>
                    <div key={item.id} className={homeStyles.photoscontainer}>
                      <p>{item.name}</p>
                      <img src={item.img} />
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <ul className={homeStyles.messagePreviewList}>
            {messages.map((message) => (
              <li
                key={message.id}
                className={`${homeStyles.messagePreview} ${
                  selectedMessage && selectedMessage.id === message.id
                    ? homeStyles.selected
                    : ""
                }`}
                onClick={() => handleSelectMessage(message)}
              >
                <img src={message.img} alt="Message Icon" />
                <div className={homeStyles.messageContent}>
                  {message.preview}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {selectedMessage && (
        <div className={homeStyles.messageDetail}>
          <div className={homeStyles.messageHeader}>
            <FontAwesomeIcon
              className={homeStyles.leftArrow}
              icon={faArrowLeft}
              onClick={() => setSelectedMessage(null)}
            />
          </div>
          <div className={homeStyles.messageTitle}>
            <h2>{selectedMessage.title}</h2>
            <h2>{selectedMessage.date}</h2>
          </div>
          <div className={homeStyles.messageHeader}>
            <p>{selectedMessage.content}</p>
            <img
              className={homeStyles.imgLogo}
              src={selectedMessage.img}
              alt={selectedMessage.preview}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
