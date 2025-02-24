import React from 'react';
import NavBar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchBox from './SearchBox';

const Header = () => {
   return (
      <header>
         <NavBar bg="dark" variant="dark">
            <Container>
               <LinkContainer to="/">
                  <NavBar.Brand>
                     <img src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695" alt="amazon logo" width={80} />
                  </NavBar.Brand>
               </LinkContainer>{' '}
               <SearchBox />
               <nav className="d-flex aign-items-center justify-content-end me-3 ms-4">
                  <i className="fas fa-shopping-cart text-white"></i>
               </nav>
               <NavDropdown className="text-white" title="Sign In">
                  <LinkContainer className="me-2 ms-2 text-black nav-link" to="/signin">
                     <NavDropdown.Item>Sign In</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer className="me-2 ms-2 text-black nav-link" to="/signup">
                     <NavDropdown.Item>Sign Up</NavDropdown.Item>
                  </LinkContainer>
               </NavDropdown>
            </Container>
         </NavBar>
      </header>
   );
};

export default Header;
