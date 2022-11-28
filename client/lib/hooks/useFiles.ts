import axios from 'axios';
import useSWR from 'swr';

export type File = {
  name: string;
  type?: 'file' | 'dir';
  fileType?: string;
};

const getFiles = async (url: string) => {
  const host = localStorage.getItem('host')?.replace(/(^"|"$)/g, '');

  const res = await axios.get<{ files: File[] }>('/files', {
    baseURL: host + '/api/v1',
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
