import axios from 'axios';
const API_URL = "http://localhost:8000/api/";

export const getConversations = () => axios.get(`${API_URL}conversations/`);
export const getConversation = (id) => axios.get(`${API_URL}conversations/${id}/`);
export const addMessage = (id, content) => axios.post(`${API_URL}conversations/${id}/add_message/`, {content});
export const endConversation = (id) => axios.post(`${API_URL}conversations/${id}/end/`);