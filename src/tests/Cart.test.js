import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import getCategoriesResult from './mocks/api_MOCK';
import categoriesResult from './mocks/categoriesResult_MOCK';
const api = require('../services/api');

beforeEach(() => {
  jest.spyOn(api, 'getCategories').mockResolvedValue(getCategoriesResult);
  jest.spyOn(api, 'getProductsFromCategoryAndQuery').mockResolvedValue(categoriesResult);
});

describe('Verificando se o carrinho renderiza os elementos', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('verifica se ao entrar no carrinho sem itens, renderiza a mensagem correta', () => {
    const cartLink = screen.getByTestId('shopping-cart-button');
    const cartCount = screen.getByTestId('shopping-cart-size');

    expect(cartLink).toBeInTheDocument();
    expect(cartCount).toBeInTheDocument();
    expect(cartCount).toHaveTextContent(/0/i);

    userEvent.click(cartLink);

    const backLink = screen.getByRole('link');
    const emptyMessage = screen.getByText(/seu carrinho está vazio!/i);

    expect(backLink).toBeInTheDocument();
    expect(emptyMessage).toBeInTheDocument();
  });
});