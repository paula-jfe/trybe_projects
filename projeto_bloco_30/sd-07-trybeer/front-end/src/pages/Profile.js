import React from 'react';
import Header from '../components/Header';
import ClientProfile from '../components/clientProfile';

const ProfilePage = () => (
  <div>
    <Header />
    <h1 data-testid="top-title">Meu perfil</h1>
    <ClientProfile />
  </div>
);

export default ProfilePage;
