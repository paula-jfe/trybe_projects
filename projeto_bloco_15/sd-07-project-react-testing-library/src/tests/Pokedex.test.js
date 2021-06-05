import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testing file Pokedex.js', () => {
  afterEach(cleanup);

  it('the page contains an h2 heading with the text "Encountered Pokémon"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const encounteredHeading = getByRole('heading', { name: /Encountered pokémons/i });
    expect(encounteredHeading.tagName).toBe('H2');
  });

  it('Next pokemon displayed when "Próximo pokémon" button is clicked', () => {
    const { getByText } = renderWithRouter(<App />);
    const allPokemons = pokemons.map((element) => element.name);
    const nextPokemon = getByText(/Próximo pokémon/i);
    allPokemons.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    });
    const firstPokemon = getByText(/Pikachu/i);
    fireEvent.click(nextPokemon);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('only one Pokémon is shown at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const onePokemonFoundInPage = 1;
    const pokemonsInThePage = getAllByTestId('pokemon-name');
    expect(pokemonsInThePage.length).toBe(onePokemonFoundInPage);
  });

  it('Pokédex has filter buttons', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const fireButton = getByText(/Fire/i);
    fireEvent.click(fireButton);
    const firstFilteredPokemon = getByText(/Charmander/i);
    expect(firstFilteredPokemon).toBeInTheDocument();
    const nextPokemon = getByText(/Próximo pokémon/i);
    fireEvent.click(nextPokemon);
    const secondFilteredPokemon = getByText(/Rapidash/i);
    expect(secondFilteredPokemon).toBeInTheDocument();
    fireEvent.click(nextPokemon);
    expect(firstFilteredPokemon).toBeInTheDocument();
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent(/Fire/i);
  });

  it('Pokédex contains a button to reset the filter', () => {
    const { getByText, getByTestId, getByRole } = renderWithRouter(<App />);
    const allButton = getByRole('button', { name: /All/i });
    expect(allButton).toBeVisible();
    const allPokemons = pokemons.map((element) => element.name);
    const nextPokemon = getByText(/Próximo pokémon/i);
    allPokemons.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeVisible();
      fireEvent.click(nextPokemon);
    });
    const fireButton = getByText(/Fire/i);
    fireEvent.click(fireButton);
    const firstFilteredPokemon = getByText(/Charmander/i);
    expect(firstFilteredPokemon).toBeInTheDocument();
    fireEvent.click(nextPokemon);
    const secondFilteredPokemon = getByText(/Rapidash/i);
    expect(secondFilteredPokemon).toBeInTheDocument();
    fireEvent.click(nextPokemon);
    expect(firstFilteredPokemon).toBeInTheDocument();
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent(/Fire/i);
    fireEvent.click(allButton);
    allPokemons.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeVisible();
      fireEvent.click(nextPokemon);
    });
  });

  it('filter button is created dynamically for each type of Pokémon', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);
    const pokemonTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const allPokemonsTypeButtons = getAllByTestId(/pokemon-type-button/i);
    expect(allPokemonsTypeButtons.length).toEqual(pokemonTypes.length);
    const allButton = getByRole('button', { name: /All/i });
    expect(allButton).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[0] })).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[1] })).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[2] })).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[3] })).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[4] })).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[5] })).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[6] })).toBeVisible();
  });

  it('"Próximo pokémon" disabled when filtered Pokémon list has one Pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeVisible();
    const electricButton = getByRole('button', { name: /Electric/i });
    fireEvent.click(electricButton);
    const nextPokemon = getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemon).toBeDisabled();
  });
});
