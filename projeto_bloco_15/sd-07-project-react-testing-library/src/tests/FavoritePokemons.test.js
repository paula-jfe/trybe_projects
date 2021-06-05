import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('testing file FavoritePokemons.js', () => {
  afterEach(cleanup);

  it('"No favorite pokemon found" appears when you have no favorite pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeVisible();
  });

  it('all favorite Pokémon cards are displayed on the Favorite Pokémons page', () => {
    const { getByText, getAllByText, getByRole } = renderWithRouter(<App />);
    const twoMoreDetailsInFavoritePage = 2;
    const pikachuName = getByText(/Pikachu/i);
    const moreDetailsPikachu = getByText(/More details/i);
    expect(pikachuName).toBeInTheDocument();
    fireEvent.click(moreDetailsPikachu);
    const favoritePikachu = getByRole('checkbox');
    const homeLink = getByText(/Home/i);
    fireEvent.click(favoritePikachu);
    expect(favoritePikachu).toBeChecked();
    expect(homeLink).toBeVisible();
    fireEvent.click(homeLink);
    const nextPokemon = getByText(/Próximo Pokémon/i);
    expect(nextPokemon).toBeVisible();
    fireEvent.click(nextPokemon);
    const charmanderName = getByText(/Charmander/i);
    const moreDetailsCharmander = getByText(/More details/i);
    expect(charmanderName).toBeInTheDocument();
    expect(moreDetailsCharmander).toBeVisible();
    fireEvent.click(moreDetailsCharmander);
    const favoriteCharmander = getByRole('checkbox');
    expect(favoriteCharmander).toBeVisible();
    fireEvent.click(favoriteCharmander);
    expect(favoriteCharmander).toBeChecked();
    const favoritePage = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritePage);
    expect(pikachuName).toBeVisible();
    expect(charmanderName).toBeVisible();
    const getAllText = getAllByText(/More details/i);
    expect(getAllText.length).toBe(twoMoreDetailsInFavoritePage);
  });

  it('test if no Pokémon card is displayed, if no Pokémon is favorite', () => {
    const { container } = renderWithRouter(<FavoritePokemons />);
    const zeroImagesFound = 0;
    const imgPokemons = container.querySelectorAll('img');
    expect(imgPokemons.length).toBe(zeroImagesFound);
  });
});
