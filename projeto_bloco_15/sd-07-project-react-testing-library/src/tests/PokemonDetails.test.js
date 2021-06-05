import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testing file PokemonDetails.js', () => {
  afterEach(cleanup);
  const pokemonToBeTested = pokemons[0];

  it('detailed information of the selected Pokémon is shown on the screen', () => {
    const { getByText, getByRole, queryByText } = renderWithRouter(<App />);
    const pokemonName = pokemonToBeTested.name;
    const pokemonDetails = getByText(/More details/i);
    expect(pokemonDetails).toBeVisible();
    fireEvent.click(pokemonDetails);
    const headingDetails = getByRole('heading', { name: `${pokemonName} Details` });
    expect(headingDetails.tagName).toBe('H2');
    const queryNotFound = queryByText(/More details/i);
    expect(queryNotFound).toBe(null);
    const summary = getByRole('heading', { name: /Summary/i });
    expect(summary.tagName).toBe('H2');
    const description = getByText(/This intelligent Pokémon/i);
    expect(description).toBeInTheDocument();
  });

  it('section with maps containing the locations of the pokémon are displayed', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const twoHabitatMapsForPikachu = 2;
    const pokemonDetails = getByText(/More details/i);
    fireEvent.click(pokemonDetails);
    const headingLocation = getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(headingLocation).toBeInTheDocument();
    expect(headingLocation.tagName).toBe('H2');
    const pokemonLocations = pokemonToBeTested.foundAt;
    const habitatImages = getAllByAltText(/Pikachu location/i);
    expect(habitatImages.length).toBe(twoHabitatMapsForPikachu);
    expect(pokemonLocations.length).toEqual(habitatImages.length);
    const titleMapOne = getByText(/Kanto Viridian Forest/i);
    expect(titleMapOne).toBeVisible();
    const titleMapTwo = getByText(/Kanto Power Plant/i);
    expect(titleMapTwo).toBeVisible();
    const imageMapOne = habitatImages[0];
    expect(imageMapOne).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const imageMapTwo = habitatImages[1];
    expect(imageMapTwo).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('the user can favorite a pokémon through the details page', () => {
    const { getByText, getByAltText, queryByAltText } = renderWithRouter(<App />);
    const pokemonDetails = getByText(/More details/i);
    fireEvent.click(pokemonDetails);
    const favoritePikachu = getByText(/Pokémon favoritado?/i);
    fireEvent.click(favoritePikachu);
    const favoriteStarImage = getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteStarImage).toHaveClass('favorite-icon');
    fireEvent.click(favoritePikachu);
    const queryNotFound = queryByAltText(/Pikachu is marked as favorite/i);
    expect(queryNotFound).toBe(null);
  });
});
