import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
const api = require('../services/api');
import getCategoriesResult from './mocks/api_MOCK';
import categoriesResult from './mocks/categoriesResult_MOCK';
import '@testing-library/jest-dom';

beforeEach(() => {
  jest.spyOn(api, 'getCategories').mockResolvedValue(getCategoriesResult);
  jest.spyOn(api, 'getProductsFromCategoryAndQuery').mockResolvedValue(categoriesResult);
});

describe('Testa a página de detalhes de um produto', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Testa se todos os elementos são renderizados na tela', async () => {
    const foodAndBeverageCategory = await screen.findByRole('button', { name: /Alimentos e Bebidas/i });

    expect(foodAndBeverageCategory).toBeInTheDocument();

    userEvent.click(foodAndBeverageCategory);

    const detailLinks = await screen.findAllByTestId('product-detail-link');

    detailLinks.forEach((link) => expect(link).toBeInTheDocument());

    userEvent.click(detailLinks[0]);
    
    const productName = screen.getByTestId('product-detail-name');
    const productImage = screen.getByRole('img');
    const addToCart = screen.getByRole('button', { name: /Adicionar ao carrinho/i });
    const inputs = screen.getAllByRole('textbox');
    const rateButton = screen.getByRole('button', { name: /Avaliar/i });
    const links = screen.getAllByRole('link');

    expect(productImage).toBeInTheDocument();
    expect(productName).toBeInTheDocument();
    expect(addToCart).toBeInTheDocument();
    expect(rateButton).toBeInTheDocument();
    inputs.forEach((input) => expect(input).toBeInTheDocument());
    links.forEach((link) => expect(link).toBeInTheDocument());
  });

  test('Testa o funcionamento do botão de adicionar ao carrinho e de adicionar comentário', async () => {
    const foodAndBeverageCategory = await screen.findByRole('button', { name: /Alimentos e Bebidas/i });

    expect(foodAndBeverageCategory).toBeInTheDocument();

    userEvent.click(foodAndBeverageCategory);
    const detailLinks = await screen.findAllByTestId('product-detail-link');

    detailLinks.forEach((link) => expect(link).toBeInTheDocument());

    userEvent.click(detailLinks[0]);

    const addToCart = screen.getByRole('button', { name: /Adicionar ao carrinho/i });
    const inputs = screen.getAllByRole('textbox');
    const rateButton = screen.getByRole('button', { name: /Avaliar/i });
    const links = screen.getAllByRole('link');

    expect(rateButton).toBeInTheDocument();
    expect(addToCart).toBeInTheDocument();
    inputs.forEach((input) => expect(input).toBeInTheDocument());
    links.forEach((link) => expect(link).toBeInTheDocument());
    expect(links[1]).toHaveTextContent('(0)');
    expect(rateButton).toBeDisabled();

    userEvent.click(addToCart);

    expect(links[1]).toHaveTextContent('(1)');
    
    userEvent.type(inputs[0], 'caiojlimah@gmail.com');
    userEvent.type(inputs[1], 'Adorei o chá! Sabor inconfundível!');

    expect(rateButton).not.toBeDisabled();

    userEvent.click(rateButton);

    const commentEmail = await screen.findByRole('heading', { name: /caiojlimah@gmail.com/i, level: 3 });
    const commentComment = await screen.findByRole('heading', { name: /Adorei o chá! Sabor inconfundível!/i, level: 4 });

    expect(commentComment).toBeInTheDocument();
    expect(commentEmail).toBeInTheDocument();
  });
});