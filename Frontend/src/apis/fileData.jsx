import axios from 'axios';

const api = axios.create({
  baseURL : "http://localhost:3000"
});

export const sendData = async (curData) => {
  try {
    const data = await api.post("/data" , curData);
    return data;
  } catch (error) {
    return error;
  }
}
