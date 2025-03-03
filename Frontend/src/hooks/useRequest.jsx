import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const useRequest = (url, options = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const optionsRef = useRef(options);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const { data: dataFromServer } = await axios(url, optionsRef.current);
        setData(dataFromServer);
      } catch (error) {
        setError(error.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, optionsRef]);
  return { isLoading, error, data };
};

export default useRequest;
