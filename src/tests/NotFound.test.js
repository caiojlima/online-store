import React from 'react';
import '@testing-library/jest-dom'
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import NotFound from '../Pages/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando a página NotFound', () => {
  test('Testando se renderiza todos os elementos e o funcionamento do botão', async () => {
    const { history } = renderWithRouter(<NotFound />);

    const pageMessage = screen.getByText(/Página não encontrada!/i);
    const errorMessage = screen.getByText(/ERRO 404./i);
    const link = screen.getByRole('link');

    expect(pageMessage).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/')
  });
})