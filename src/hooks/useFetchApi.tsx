import {useQuery} from 'react-query';
import {fetchApi} from '../api';

export const useFetchApi = (key, endpoint, options = {}) => {
  const {isLoading, isError, data, error, refetch} = useQuery(
    key,
    () => fetchApi(endpoint),
    options,
  );

  return {isLoading, isError, data, error, refetch, fetchApi};
};
