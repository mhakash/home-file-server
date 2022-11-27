import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
});
