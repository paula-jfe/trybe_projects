import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import registerUser from '../services/user';
import getToken from '../services/login';

export default function Register() {
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setRegisterData({
      ...registerData, [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = registerData;
    let newRegister = {
      name,
      email,
      password,
      role: '',
    };
    const userToken = await getToken(JSON.stringify({ email, password }));
    const userData = {
      name: userToken.name,
      email: userToken.email,
      token: userToken.token,
      role: userToken.role,
    };
    if (checkboxValue) {
      newRegister = { ...newRegister, role: 'admin' };
      await registerUser(JSON.stringify(newRegister))
        .then(() => {
          localStorage.setItem('user', JSON.stringify(userData));
          setShouldRedirect('/admin/orders');
        })
        .catch(() => setMessage('Já existe um usuário com esse e-mail.'));
    }
    newRegister = { ...newRegister, role: 'client' };
    await registerUser(JSON.stringify(newRegister))
      .then(() => {
        localStorage.setItem('user', JSON.stringify(userData));
        setShouldRedirect('/products');
      })
      .catch(() => setMessage('Já existe um usuário com esse e-mail.'));
  };

  useEffect(() => {
    const { name, email, password } = registerData;
    const rEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regexForName = /^[a-z ]+$/i;
    const minLengthForPassword = 6;
    const minLengthForName = 12;
    const passwordIsValid = password.length >= minLengthForPassword;
    const emailIsValid = rEmail.test(email);
    const nameIsValid = regexForName.test(name) && name.length >= minLengthForName;
    if (passwordIsValid && emailIsValid && nameIsValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [registerData]);

  return (
    <form onSubmit={ (event) => handleSubmit(event) }>
      { shouldRedirect && <Redirect to={ shouldRedirect } /> }
      <label htmlFor="name">
        Nome
        <input
          name="name"
          id="name"
          data-testid="signup-name"
          type="text"
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          name="email"
          id="email"
          data-testid="signup-email"
          type="email"
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          name="password"
          id="password"
          data-testid="signup-password"
          type="password"
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label className="registerCheckBox" htmlFor="checkbox">
        Quero vender
        <input
          checked={ checkboxValue }
          id="checkbox"
          className="checkboxInput"
          data-testid="signup-seller"
          onChange={ () => setCheckboxValue(!checkboxValue) }
          type="checkbox"
        />
      </label>
      <button
        data-testid="signup-btn"
        type="submit"
        disabled={ disabled }
      >
        Cadastrar
      </button>
      <p>{ message }</p>
    </form>
  );
}
