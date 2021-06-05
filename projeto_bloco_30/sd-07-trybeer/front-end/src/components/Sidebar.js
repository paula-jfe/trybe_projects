import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import '../styles/menu.css';

export default function Sidebar({ openAndClose }) {
  const [shouldRedirect, setShouldRedirect] = useState('');

  return (
    <aside className="side-menu-container">
      { shouldRedirect !== '' && <Redirect to={ shouldRedirect } /> }
      { openAndClose
      && (
        <div>
          <button
            data-testid="side-menu-item-products"
            type="button"
            onClick={ () => setShouldRedirect('/products') }
          >
            Produtos
          </button>
          <button
            data-testid="side-menu-item-my-orders"
            type="button"
            onClick={ () => setShouldRedirect('/orders') }
          >
            Meus Pedidos
          </button>
          <button
            data-testid="side-menu-item-my-profile"
            type="button"
            onClick={ () => setShouldRedirect('/profile') }
          >
            Meu Perfil
          </button>
          <button
            data-testid="side-menu-item-logout"
            type="button"
            onClick={ () => {
              localStorage.removeItem('user');
              setShouldRedirect('/login');
            } }
          >
            Sair
          </button>
        </div>
      )}
    </aside>
  );
}

Sidebar.propTypes = {
  openAndClose: PropTypes.bool.isRequired,
};
