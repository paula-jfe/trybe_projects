import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminProfile() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [shouldRedirect, setShouldRedirect] = useState('');

  useEffect(() => {
    if (!currentUser) {
      setShouldRedirect('/login');
    }
  }, []);

  return (
    <>
      { shouldRedirect && <Redirect to={ shouldRedirect } /> }
      <h1>Perfil</h1>
      <AdminSidebar />
      { currentUser && (
        <form>
          <label htmlFor="name">
            Nome:
            <p data-testid="profile-name">{ currentUser.name }</p>
          </label>
          <label htmlFor="email">
            Email:
            <p data-testid="profile-email">{ currentUser.email }</p>
          </label>
        </form>
      ) }
    </>
  );
}
