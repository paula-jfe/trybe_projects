import React, { useState } from 'react';
import { updateUser } from '../../services/apiServices';
import profileValidation from './profileValidation';

export default function ClientProfile() {
  const [name, setName] = useState('');
  const [nameUpdate, setNameUpdate] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('user'));

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const user = {
      name,
      email: currentUser.email,
      token: currentUser.token,
    };
    // req da api enviando:
    const response = await updateUser(user).then((apiResponse) => apiResponse);

    if (response) setNameUpdate(true);
  };

  return (
    <form onSubmit={ onSubmitHandler }>
      <label htmlFor="name">
        <span>Name</span>
        <input
          value={ name }
          id="name"
          onChange={ (e) => setName(e.target.value) }
          type="name"
          name="name"
          data-testid="profile-name-input"
          required
        />
      </label>

      <label htmlFor="email">
        Email
        <input
          value={ currentUser.email }
          id="email"
          type="email"
          name="email"
          data-testid="profile-email-input"
          readOnly
        />
      </label>

      <button
        type="submit"
        data-testid="profile-save-btn"
        disabled={ profileValidation(name) }
      >
        Salvar
      </button>

      { nameUpdate && <span>Atualização concluída com sucesso</span> }
    </form>
  );
}
