import axios from "axios";

axios.defaults.baseURL = "https://elif-tech-be.onrender.com";

export const fetchEvents = async (page, options = {}) => {
  const response = await axios.get("/events", {
    params: { page, perPage: 12, ...options },
  });

  return response.data.data;
};

export const getEventById = async (eventId) => {
  const response = await axios.get(`/events/${eventId}`);

  return response.data.data;
};

export const registerUser = async (eventId, payload) => {
  const response = await axios.post(`/events/${eventId}`, payload);

  return response.data;
};

export const fetchParticipants = async (eventId) => {
  const response = await axios.get(`/events/${eventId}/participants`);

  return response.data.data;
};

export const getEventByName = async (title, page) => {
  const response = await axios.post(`/events?page=${page}&perPage=12`, {
    title,
  });

  return response.data.data;
};
