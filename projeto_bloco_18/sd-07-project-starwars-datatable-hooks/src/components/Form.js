import React, { useState, useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Form() {
  const { filterPlanets, filterSelectedPreferences } = useContext(StarWarsContext);
  const [keyWord, setKeyWord] = useState('');
  const [preference, setPreference] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });
  const [columnOptions, setColumnOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const valueRange = ['maior que', 'menor que', 'igual a'];

  const handleChange = ({ target }) => {
    const word = target.value;
    setKeyWord(word);
  };

  const filterPreferences = ({ target }) => {
    const attribute = target.getAttribute('data-testid');
    if (attribute === 'column-filter') {
      setPreference({ ...preference, column: target.value });
    } else if (attribute === 'comparison-filter') {
      setPreference({ ...preference, comparison: target.value });
    } else {
      setPreference({ ...preference, value: target.value });
    }
  };

  useEffect(() => {
    filterPlanets(keyWord);
  }, [filterPlanets, keyWord]);

  const handleClick = () => {
    const copyColumnOptions = [...columnOptions];
    const optionToBeRemoved = preference.column;
    const indexOfOption = copyColumnOptions.indexOf(optionToBeRemoved);
    copyColumnOptions.splice(indexOfOption, 1);
    setColumnOptions(copyColumnOptions);
    filterSelectedPreferences(preference);
  };

  return (
    <div>
      <form>
        <input
          data-testid="name-filter"
          type="text"
          onChange={ handleChange }
        />
        <select
          data-testid="column-filter"
          onChange={ filterPreferences }
        >
          { columnOptions.map((element) => <option key={ element }>{ element }</option>) }
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ filterPreferences }
        >
          { valueRange.map((element) => <option key={ element }>{ element }</option>) }
        </select>
        <input
          key="value"
          data-testid="value-filter"
          onChange={ filterPreferences }
          type="number"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Aplicar filtro
        </button>
      </form>
    </div>

  );
}

export default Form;
