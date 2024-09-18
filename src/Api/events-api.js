import axios from "axios";

export const fetchEvents = async (page) => {
  const response = await axios.get("https://elif-tech-be.onrender.com/events", {
    params: { page, perPage: 12 },
  });

  return response.data.data;
};

export const getEventById = async (eventId) => {
  const response = await axios.get(
    `https://elif-tech-be.onrender.com/events/${eventId}`
  );

  return response.data.data;
};
