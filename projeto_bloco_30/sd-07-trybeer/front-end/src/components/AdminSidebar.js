import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function AdminSidebar() {
  const [shouldRedirect, setShouldRedirect] = useState('');

  return (
    <aside className="admin-side-bar-container">
      <h1>TryBeer</h1>

      { shouldRedirect !== '' && <Redirect to={ shouldRedirect } /> }

      <div>
        <button
          data-testid="side-menu-item-orders"
          type="button"
          onClick={ () => setShouldRedirect('/admin/orders') }
        >
          Pedidos
        </button>
        <button
          data-testid="side-menu-item-profile"
          type="button"
          onClick={ () => setShouldRedirect('/admin/profile') }
        >
          Perfil
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
    </aside>
  );
}
