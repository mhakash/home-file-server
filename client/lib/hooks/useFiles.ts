import useSWR from 'swr';
import { http } from '../api/http';

export type File = {
  name: string;
  type?: 'file' | 'dir';
};

const getFiles = async (url: string) => {
  const res = await http.get<{ files: File[] }>('/ping', {
    params: {
      f: url,
    },
  });

  return res.data;
};

export const useFiles = (url: string) => {
  const { data } = useSWR(['ping', url], () => getFiles(url));
  return { files: data };
};
