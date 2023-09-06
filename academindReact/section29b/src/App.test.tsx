import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('check todos render', () => {
  render(<App />);
  const listElement = screen.getByText(/learn react/i);
  expect(listElement).toBeInTheDocument();
});
