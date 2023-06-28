exports.paymentData = [
  {
    cargo: "Rent",
    fechaLimite: "2023-05-31",
    estado: "Pending",
    cantidad: 1000.55,
  },
  {
    cargo: "Utilities",
    fechaLimite: "2023-05-15",
    estado: "Paid",
    cantidad: 500.75,
  },
  {
    cargo: "Internet",
    fechaLimite: "2023-05-20",
    estado: "Pending",
    cantidad: 250.35,
  },
];

exports.statementData = {
  debt: [
    {
      tipo: "Abuso de parqueo",
      monto: 300.23,
    },
    {
      tipo: "Exceso de volumen",
      monto: 700.78,
    },
    {
      tipo: "Excremento de perro",
      monto: 500.89,
    },
  ],
  due: [
    {
      tipo: "Alquifiestas",
      monto: 5000,
    },
    {
      tipo: "Agua",
      monto: 300,
    },
    {
      tipo: "Mantenimiento",
      monto: 700,
    },
    {
      tipo: "Luz",
      monto: 500,
    },
  ],
  done: [
    {
      tipo: "Parqueo",
      monto: 500,
    },
    {
      tipo: "GEWI",
      monto: 8,
    },
  ],
};

exports.DUMMY_AMENITIES = [
  {
    id: 1,
    img: "/images/temp/amenities/pool.jpg",
    name: "Piscina",
    description:
      "Escape to a world of pure bliss at our stunning pool oasis. Immerse yourself in the tranquil waters, surrounded by a captivating ambiance that transports you to a realm of serenity. Whether you seek relaxation or invigorating swims, our luxurious pool offers the perfect haven for your enjoyment. Lounge on plush sunbeds, soak up the warm rays, and create lasting memories in this oasis of pure delight. Book your escape now and experience the ultimate poolside paradise.",
    capacity: 15,
    services: [
      "Discapacitados",
      "Aire Acondicionado",
      "Wi-Fi",
      "Prohibido Fumar",
      "Audio",
      "Televisores",
      "Duchas",
    ],
    schedule: { open: "8:00", close: "18:00" },
    weekdays: ["mon", "tue", "fri", "sat", "sun"],
  },
  {
    id: 2,
    img: "/images/temp/amenities/gym.jpg",
    name: "Fitness Center",
    description:
      "Elevate your fitness journey at our state-of-the-art fitness center. With cutting-edge equipment, expert trainers, and a motivating atmosphere, achieve your health goals in style. From cardio workouts to strength training, we offer a comprehensive range of facilities and classes. Embrace a healthier lifestyle and unlock your full potential.",
    capacity: 50,
    services: ["Personal Training", "Group Classes", "Locker Rooms", "Sauna"],
    schedule: { open: "6:00", close: "22:00" },
    weekdays: ["mon", "tue", "wed", "thu", "fri", "sat"],
  },
  {
    id: 3,
    img: "/images/temp/amenities/lobby.jpg",
    name: "Spa & Wellness Center",
    description:
      "Embark on a journey of relaxation and rejuvenation at our luxurious spa and wellness center. Indulge in an array of therapeutic treatments, from soothing massages to revitalizing facials. Let our skilled therapists pamper your senses and restore balance to your mind, body, and soul. Immerse yourself in pure bliss and emerge feeling refreshed and renewed.",
    capacity: 10,
    services: ["Massages", "Facials", "Body Treatments", "Sauna", "Steam Room"],
    schedule: { open: "9:00", close: "20:00" },
    weekdays: ["tue", "wed", "thu", "fri", "sat"],
  },
  {
    id: 4,
    img: "/images/temp/amenities/firepit.jpg",
    name: "Gourmet Restaurant",
    description:
      "Savor the finest culinary delights at our gourmet restaurant. Delight your taste buds with a fusion of flavors, crafted by our talented chefs using the freshest ingredients. Indulge in exquisite dishes, paired with an extensive selection of fine wines. Experience a culinary journey that delights the senses and creates memories to cherish.",
    capacity: 30,
    services: [
      "Fine Dining",
      "Wine Pairing",
      "Private Dining",
      "Outdoor Seating",
    ],
    schedule: { open: "18:00", close: "23:00" },
    weekdays: ["wed", "thu", "fri", "sat", "sun"],
  },
  {
    id: 5,
    img: "/images/temp/amenities/business_center.jpg",
    name: "Conference Center",
    description:
      "Host your next successful event at our modern conference center. With versatile spaces, advanced technology, and dedicated support, we provide the ideal setting for meetings, conferences, and seminars. From intimate gatherings to large-scale events, our facilities cater to your specific needs. Make a lasting impression with a seamless and professional event experience.",
    capacity: 100,
    services: [
      "Audio-Visual Equipment",
      "Catering",
      "Meeting Rooms",
      "High-Speed Internet",
    ],
    schedule: { open: "8:00", close: "18:00" },
    weekdays: ["mon", "tue", "wed", "thu", "fri"],
  },
  {
    id: 6,
    img: "/images/temp/amenities/tennis.png",
    name: "Tennis Courts",
    description:
      "Ace your game on our top-notch tennis courts. Whether you're a seasoned player or a beginner, our meticulously maintained courts offer the perfect environment for a thrilling match. Enjoy friendly competitions or improve your skills with professional coaching. Embrace the spirit of sportsmanship and experience the joy of playing tennis in a picturesque setting.",
    capacity: 8,
    services: ["Tennis Lessons", "Racket Rental", "Ball Machine", "Lighting"],
    schedule: { open: "9:00", close: "21:00" },
    weekdays: ["mon", "wed", "fri", "sun"],
  },
];

exports.months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

exports.contacts = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
];

exports.solicitadosData = [
  {
    thumbnail: "/images/temp/profile/woman3.png",
    user: "Luis Sierra",
    place: "Place 6",
    dateTime: "2023-05-17 3:30 PM",
    type: "car",
  },
  {
    thumbnail: "/images/temp/profile/man2.png",
    user: "uim",
    place: "Place 7",
    dateTime: "2023-05-18 11:00 AM",
    type: "car",
  },
  {
    thumbnail: "/images/temp/profile/man.jpg",
    user: "Luis Sierra",
    place: "Place 8",
    dateTime: "2023-05-19 5:45 PM",
    type: "car",
  },
  {
    thumbnail: "/images/temp/profile/woman2.png",
    user: "uim",
    place: "Place 9",
    dateTime: "2023-05-20 9:30 AM",
    type: "personal",
  },
  {
    thumbnail: "/images/temp/profile/woman3.png",
    user: "uim",
    place: "Place 10",
    dateTime: "2023-05-21 12:15 PM",
    type: "heli",
  },
  {
    thumbnail: "/images/temp/profile/man2.png",
    user: "uim",
    place: "Place 9",
    dateTime: "2023-05-20 9:30 AM",
    type: "personal",
  },
  {
    thumbnail: "/images/temp/profile/man.jpg",
    user: "uim",
    place: "Place 10",
    dateTime: "2023-05-21 12:15 PM",
    type: "personal",
  },
  {
    thumbnail: "/images/temp/profile/woman1.png",
    user: "uim",
    place: "Place 9",
    dateTime: "2023-05-20 9:30 AM",
    type: "personal",
  },
  {
    thumbnail: "/images/temp/profile/woman2.png",
    user: "uim",
    place: "Place 10",
    dateTime: "2023-05-21 12:15 PM",
    type: "personal",
  },
  {
    thumbnail: "/images/temp/profile/man.jpg",
    user: "uim",
    place: "Place 10",
    dateTime: "2023-05-21 12:15 PM",
    type: "heli",
  },
  {
    thumbnail: "/images/temp/profile/woman3.png",
    user: "uim",
    place: "Place 10",
    dateTime: "2023-05-21 12:15 PM",
    type: "heli",
  },
  {
    thumbnail: "/images/temp/profile/man2.png",
    user: "uim",
    place: "Place 10",
    dateTime: "2023-05-21 12:15 PM",
    type: "heli",
  },
  {
    thumbnail: "/images/temp/profile/woman3.png",
    user: "uim",
    place: "Place 10",
    dateTime: "2023-05-21 12:15 PM",
    type: "heli",
  },
  {
    thumbnail: "/images/temp/profile/woman1.png",
    user: "uim",
    place: "Place 10",
    dateTime: "2023-05-21 12:15 PM",
    type: "heli",
  },
  {
    thumbnail: "/images/temp/profile/man2.png",
    user: "uim",
    place: "Place 10",
    dateTime: "2023-05-21 12:15 PM",
    type: "heli",
  },
  {
    thumbnail: "/images/temp/profile/man.jpg",
    user: "uim",
    place: "Place 10",
    dateTime: "2023-05-21 12:15 PM",
    type: "heli",
  },
];

exports.viviendaOptions = ["House 1", "House 2", "House 3", "House 4"];

exports.type = ["Carro", "Personal", "Heli"];

exports.DUMMY_PROFILE = {
  name: "Luis Sierra",
  email: "luissierra@gewi.com",
  notifications: [
    {
      id: 1,
      title: "Ha creado un nuevo acceso",
      hour: "12:30pm",
    },
    {
      id: 2,
      title: "Le han dado acceso a una nueva casa",
      hour: "12:30pm",
    },
    {
      id: 3,
      title: "Ha creado una reserva para la piscina",
      hour: "12:30pm",
    },
    {
      id: 4,
      title: "Recuerde que tiene un pago pendiente",
      hour: "12:30pm",
    },
  ],
};
