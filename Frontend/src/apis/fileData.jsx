import axios from 'axios';

const api = axios.create({
  baseURL : "https://makeme-backend.onrender.com"
});

export const sendData = async (curData) => {
  try {
    const data = await api.post("/data" , curData);
    return data;
  } catch (error) {
    return error;
  }
}
