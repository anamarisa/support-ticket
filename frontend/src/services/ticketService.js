import api from "@/lib/api";

export const fetchTickets = async () => {
  const response = await api.get("/tickets");
  return response.data.data;
};

export const createTicket = async (payload) => {
  const response = await api.post("/tickets", payload);
  return response.data;
};

export const fetchAllTickets = async () => {
  const response = await api.get("/all-tickets");
  return response.data.data;
};

export const updateTicket = async (id, payload) => {
  const response = await api.put(`/tickets/${id}`, payload);
  return response.data.data;
};
