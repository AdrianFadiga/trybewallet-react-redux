import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { USER_LOGIN } from '../actions';
import { validatePassword } from '../helpers';
import style from './Login.module.css';
import walletLogo from '../images/logoWallet.png';

function Login() {
  // const { email } = useSelector((state) => state.email);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: USER_LOGIN,
      payload: email,
    });
    navigate('/wallet');
  };

  useEffect(() => {
    dispatch({
      type: USER_LOGIN,
      payload: '',
    });
  }, []);

  useEffect(() => {
    setIsDisabled(!validatePassword(email, password));
  }, [email, password]);

  return (
    <section className={style.loginPage}>
      <div className={style.loginContainer}>
        <div className={style.logoContainer}>
          <img
            className={style.logoImg}
            src={walletLogo}
            width="200px"
            alt=""
          />
        </div>
        <Form className={style.loginForm}>
          <Form.Group className="mb-2">
            <Form.Label className="mb-2">
              Email address
            </Form.Label>
            <Form.Control
              className="mb-2"
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Enter email"
            />
            <Form.Text className="text-mute">
              We&apos;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label className="mb-2">
              Password
            </Form.Label>
            <Form.Control
              className="mb-2"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <div className={style.buttonContainer}>
            <Button
              className={style.loginButton}
              variant="outline-success"
              disabled={isDisabled}
              onClick={handleClick}
            >
              Entrar
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}

export default Login;
