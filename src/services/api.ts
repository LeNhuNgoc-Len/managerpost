// src/services/api.ts
import axios from 'axios';

const API_URL = 'https://65e17952a8583365b316751b.mockapi.io/news';

export const getNews = () => axios.get(API_URL);
export const addNews = (news: any) => axios.post(API_URL, news);
export const updateNews = (id: string, news: any) => {
    const url = `${API_URL}/${id}`;
    console.log("Update URL:", url); // Log the URL to the console
    console.log("Update Data:", news); // Log the data being sent to the API
    return axios.put(url, news);
  };
export const deleteNews = (id: string) => axios.delete(`${API_URL}/${id}`);
