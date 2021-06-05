import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

function StarWarsProvider({ children }) {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planetsList, setPlanets] = useState(
    {
      planets: [],
    },
  );

  const [filteredPlanets, setFilteredPlanets] = useState(
    {
      planets: [],
      filters: {
        filterByName: {
          name: '',
        },
        filterByNumericValues: [],
      },
    },
  );

  const fetchPlanets = async () => {
    const planetsFound = await fetch(url)
      .then((response) => response.json())
      .then((data) => data.results);
    planetsFound.forEach((planet) => delete planet.residents);
    setPlanets({ ...planetsList, planets: planetsFound });
    setFilteredPlanets({ ...filteredPlanets, planets: planetsFound });
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const filterPlanets = (keyWord) => {
    if (keyWord) {
      const findPlanet = planetsList.planets
        .filter((planet) => planet.name.toLowerCase()
          .includes(keyWord.toLowerCase()));
      setFilteredPlanets({
        ...planetsList,
        planets: findPlanet,
        filters: {
          filterByName: {
            name: keyWord,
          },
        } });
      return findPlanet;
    }
    setFilteredPlanets({ ...planetsList, name: keyWord });
    return planetsList;
  };

  const biggerThan = (column, value) => {
    const getBiggerThan = filteredPlanets.planets
      .filter((planet) => Number(planet[column]) > Number(value));
    if (getBiggerThan) {
      setFilteredPlanets({
        planets: getBiggerThan,
        filters: {
          filterByNumericValues: [...filteredPlanets.filters
            .filterByNumericValues, { column, comparison: 'maior que', value }],
        },
      });
    } else {
      setFilteredPlanets({ planets: [] });
    }
  };

  const lessThan = (column, value) => {
    const getLessThan = filteredPlanets.planets
      .filter((planet) => Number(planet[column]) < Number(value));
    if (getLessThan) {
      setFilteredPlanets({
        planets: getLessThan,
        filters: {
          filterByNumericValues: [...filteredPlanets.filters
            .filterByNumericValues, { column, comparison: 'menor que', value }],
        },
      });
    } else {
      setFilteredPlanets({ planets: [] });
    }
  };

  const equalTo = (column, value) => {
    const getEqualTo = filteredPlanets.planets
      .filter((planet) => Number(planet[column]) === Number(value));
    setFilteredPlanets({
      planets: getEqualTo,
      filters: {
        filterByNumericValues: [...filteredPlanets.filters
          .filterByNumericValues, { column, comparison: 'igual a', value }],
      },
    });
  };

  const filterSelectedPreferences = ({ column, comparison, value }) => {
    switch (comparison) {
    case 'maior que':
      return biggerThan(column, value);
    case 'menor que':
      return lessThan(column, value);
    case 'igual a':
      return equalTo(column, value);
    default:
      return '';
    }
  };

  return (
    <div>
      <StarWarsContext.Provider
        value={ {
          planetsList,
          filteredPlanets,
          filterPlanets,
          filterSelectedPreferences,
        } }
      >
        { children }
      </StarWarsContext.Provider>
    </div>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default StarWarsProvider;
