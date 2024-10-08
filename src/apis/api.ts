import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.foodiebuddy.kro.kr', // baseURL 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
