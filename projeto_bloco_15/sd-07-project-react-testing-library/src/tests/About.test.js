import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('testing file About.js', () => {
  afterEach(cleanup);

  it('the page contains information about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const about = getByText(/This application simulates a Pokédex/i);
    expect(about).toBeInTheDocument();
  });

  it('the page contains an h2 heading with the text "About Pokédex"', () => {
    /* https://github.com/testing-library/jest-dom/issues/213 */
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { name: 'About Pokédex' });
    expect(heading.tagName).toBe('H2');
  });

  it('the page contains two paragraphs with text about Pokédex', () => {
    /* https://testing-library.com/docs/dom-testing-library/api-queries/ */
    const { container } = renderWithRouter(<About />);
    const twoParagraphsInAboutPage = 2;
    const paragraph = container.querySelectorAll('p');
    expect(paragraph.length).toBe(twoParagraphsInAboutPage);
    /* https://github.com/testing-library/jest-dom */
    expect(paragraph[0]).toHaveTextContent(/This application simulates a Pokédex/i);
    expect(paragraph[1]).toHaveTextContent(/One can filter Pokémons by type/i);
  });

  it('the page contains an image of a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
