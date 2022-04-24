import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER_LOGIN } from '../actions';
import { validatePassword } from '../helpers';

function Login() {
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
    setIsDisabled(!validatePassword(email, password));
  }, [email, password]);

  return (
    <section className="loginPage">
      <div className="loginContainer">
        <form>
          <input
            type="email"
            data-testid="email-input"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            type="password"
            data-testid="password-input"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button
            type="button"
            disabled={isDisabled}
            onClick={handleClick}
          >
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
