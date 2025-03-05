import NavBar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchBox from './search-box';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../../store';
import { USER_SIGNOUT } from '../../actions';

const Header = () => {
  const navigate = useNavigate();
  const {
    state: { userInfo },
    dispatch,
  } = useContext(Store);
  const handleSignOut = () => {
    dispatch({ type: USER_SIGNOUT });
    localStorage.removeItem('userInfo');
  };
  return (
    <header>
      <NavBar bg="dark" variant="dark">
        <Container>
          {/* TODO: Ensure that using back button doesnt take user outside of the site */}
          <Link onClick={() => navigate(-1)}>
            {location.pathname !== '/' && (
              <i className="fas fa-arrow-left text-white align-arrow-right"> Back</i>
            )}
          </Link>
          <LinkContainer to="/">
            <NavBar.Brand>
              <img
                src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                alt="amazon logo"
                width={80}
              />
            </NavBar.Brand>
          </LinkContainer>{' '}
          <SearchBox />
          <nav className="d-flex aign-items-center justify-content-end me-3 ms-4">
            <i className="fas fa-shopping-cart text-white"></i>
          </nav>
          {userInfo ? (
            <NavDropdown className="text-white" title={userInfo.name}>
              <LinkContainer to="/profile" onClick={() => {}}>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/orderhistory" onClick={() => {}}>
                <NavDropdown.Item>Order History</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer className="drop-down-item text-dark" to="/" onClick={handleSignOut}>
                <NavDropdown.Item>Sign-Out</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          ) : (
            <NavDropdown className="text-white" title="Sign In">
              <LinkContainer to="/signin">
                <NavDropdown.Item>Sign In</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/signup">
                <NavDropdown.Item>Sign Up</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </Container>
      </NavBar>
    </header>
  );
};

export default Header;
