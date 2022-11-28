import useSWR from 'swr';
import { http } from '../api/http';

const getHtmlFile = async (f: string) => {
  const res = await http.get('/file/html', { params: { f } });
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
