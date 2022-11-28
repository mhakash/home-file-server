import axios from 'axios';
import useSWR from 'swr';
// import { http } from '../api/http';

const getHtmlFile = async (f: string) => {
  const host = localStorage.getItem('host')?.replace(/(^"|"$)/g, '');

  const res = await axios.get('/file/html', {
    baseURL: host + '/api/v1',
    params: { f },
    responseType: 'text',
  });

  return res.data;
};

export const useHtml = (f: string) => {
  const { data, error } = useSWR(['/file/html', f], () => getHtmlFile(f));
  return {
    error,
    data,
    loading: !data && !error,
  };
};
