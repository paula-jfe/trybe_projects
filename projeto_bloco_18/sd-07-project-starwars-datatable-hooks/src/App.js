import React from 'react';
import './App.css';
import Table from './components/Table';
import Form from './components/Form';
import StarWarsProvider from './provider/StarWarsProvider';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <Form />
        <Table />
      </StarWarsProvider>
    </div>
  );
}

export default App;
