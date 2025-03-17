import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { buildSearchQuery, extractParamsFromSearchUri } from '../utils';
import useRequest from '../hooks/use-request';
import { toast } from 'react-toastify';

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const { category, query, price, rating, order, page } = extractParamsFromSearchUri(search);
  const searchQueryUrl = buildSearchQuery(category, query, price, rating, order, page);
  const {
    isLoading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useRequest('/api/v1/products/categories');

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
    if (categoriesError) {
      toast.error(categoriesError);
    }
  }, [categoriesData, categoriesError]);

  const { isLoading, error, data: productsData } = useRequest(`api/v1/products${searchQueryUrl}`);
  const { products = [], pages = 1, countProducts = 0 } = productsData || {};
  return <div></div>;
};

export default SearchPage;
