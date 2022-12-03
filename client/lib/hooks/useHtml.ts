import axios from 'axios';
import useSWR from 'swr';
import { getHostFromStore } from '../utils';
// import { http } from '../api/http';

const getHtmlFile = async (f: string) => {
  const host = getHostFromStore();

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
