import axios from 'axios';
import useSWR from 'swr';
import { getHostFromStore } from '../utils';

const getPasswords = async () => {
  const host = getHostFromStore();

  const res = await axios.get('/passwords', {
    baseURL: host + '/api/v1',
  });

  return res.data;
};

export const usePasswords = () => {
  const { data, error } = useSWR('passwords', getPasswords);
  return {
    error,
    data,
    loading: !data && !error,
  };
};
