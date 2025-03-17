import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFilterUrl } from '../../utils';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { search } = useLocation();
  const navigateByQuery = () => {
    if (query) {
      const filterUri = getFilterUrl(search, { query });
      navigate(filterUri);
    }
  };

  // useEffect(() => {
  //   navigateByQuery();
  // }, [navigateByQuery, query]);

  const submitHandler = e => {
    e.preventDefault();
    navigateByQuery();
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex me-auto w-50">
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Search for products..."
          onChange={e => setQuery(e.target.value)}
        ></FormControl>
        <Button variant="warning" type="submit">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
