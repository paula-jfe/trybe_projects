import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('testing file NotFound.js', () => {
  afterEach(cleanup);

  it('the page contains an h2 heading with the text "Page requested not found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const cry = getByRole('heading', { name: 'Page requested not found Crying emoji' });
    expect(cry.tagName).toBe('H2');
  });

  it('the page shows the image for not found', () => {
    const { container } = renderWithRouter(<NotFound />);
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
