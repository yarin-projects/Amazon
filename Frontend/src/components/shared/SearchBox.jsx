import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const SearchBox = () => {
   return (
      <Form onSubmit={() => {}} className="d-flex me-auto w-50">
         <InputGroup>
            <FormControl type="text" placeholder="Search for products..." onChange={() => {}}></FormControl>
            <Button variant="warning" type="submit">
               <i className="fas fa-search"></i>
            </Button>
         </InputGroup>
      </Form>
   );
};

export default SearchBox;
