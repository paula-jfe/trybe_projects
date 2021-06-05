import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import '../styles/menu.css';

export default function Header({ title }) {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className="container-menu">
        <button
          className="hamburger-button"
          type="button"
          data-testid="top-hamburguer"
          onClick={ () => setChecked(!checked) }
        >
          <span className={ !checked ? 'hamburger-span-one' : 'x-one' } />
          <span className={ !checked ? 'hamburger-span-two' : 'x-two' } />
          <span className={ !checked ? 'hamburger-span-three' : 'x-three' } />
        </button>
      </div>
      <h1 className="menu-title" data-testid="top-title">{ title }</h1>
      <Sidebar openAndClose={ checked } />
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
