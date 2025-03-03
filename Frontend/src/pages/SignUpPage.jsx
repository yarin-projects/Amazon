import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import { USER_SIGNIN } from '../actions.js';
import Container from 'react-bootstrap/Container';
import Title from '../components/shared/Title.jsx';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(Store);

  const submitHandler = async event => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/users/signup', { name, email, password });
      dispatch({ type: USER_SIGNIN, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      console.log(error?.response?.data?.message || 'Something went wrong');
    }
  };
  const passwordDisplay =
    !password || !confirmPassword
      ? { isMatch: false }
      : password !== confirmPassword
      ? { isMatch: false, className: 'text-danger', message: 'Passwords do not match' }
      : { isMatch: true, className: 'text-success', message: 'Passwords match' };
  return (
    <Container className="small-container">
      <Title title="Sign Up" />
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name: </Form.Label>
          <Form.Control type="text" required onChange={e => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>E-mail: </Form.Label>
          <Form.Control type="email" required onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" required onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password: </Form.Label>
          <Form.Control
            type="password"
            required
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" disabled={!passwordDisplay.isMatch} variant="warning">
            Sign Up
          </Button>
          <div className={passwordDisplay.className + 'mt-1'}>{passwordDisplay.message}</div>
        </div>
        <div className="mt-2">
          Already have an account? <Link to={'/signin'}>Sign in here</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignUpPage;
