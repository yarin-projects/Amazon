import { useEffect, useState } from 'react';
import axios from 'axios';

const useRequest = (url, options = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const { data: dataFromServer } = await axios(url, options);
        setData(dataFromServer);
      } catch (error) {
        setError(error.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, options]);
  return { isLoading, error, data };
};

export default useRequest;
