import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../store';
import axios from 'axios';
import { USER_SIGNIN } from '../actions';
import Container from 'react-bootstrap/Container';
import Title from '../components/shared/title';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');

  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const submitHandler = async event => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/users/signIn', {
        email,
        password,
      });
      dispatch({ type: USER_SIGNIN, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Title title="Sign-In"></Title>
      <h1 className="my-3">Sign-In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" required onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" required onChange={e => setPassowrd(e.target.value)} />
        </Form.Group>
        <div className="mb-3">
          <Button variant="warning" type="submit">
            Submit
          </Button>
        </div>
        <div className="mt-2">
          New customer? <Link to={'/signup'}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignInPage;
