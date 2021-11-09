import React from 'react';
import { screen } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import Home from '../src/Pages/Home';

beforeEach(() => {
  renderWithRouter(<Home />)
});

describe('Testando a página inicial', () => {
  test('Verificando se o Header carrega todos os elementos.', () => {
    const title = screen.getByText(/online store/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Senha:/i);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    const register = screen.getByText(/novo?/i);
    const registerLink = screen.getByRole('link', { name: /Cadastre-se!/i });
  });
});
