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

describe('Verificando se o carrinho renderiza os elementos quando não há itens no cart', () => {
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

  test('Testa o funcionamento do carrinho.', async () => {
    const foodAndBeverageCategory = await screen.findByRole('button', { name: /Alimentos e Bebidas/i });
    const cartLinkCount = screen.getByTestId('shopping-cart-size');

    expect(cartLinkCount).toHaveTextContent('0');
    expect(foodAndBeverageCategory).toBeInTheDocument();

    userEvent.click(foodAndBeverageCategory);

    const loading = screen.getByTestId('loading');

    expect(loading).toBeInTheDocument();

    const products = await screen.findAllByTestId('product');
    const addButtons = await screen.findAllByTestId('product-add-to-cart');

    products.forEach((product) => expect(product).toBeInTheDocument());
    addButtons.forEach((button) =>{
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(/Adicionar ao carrinho/i);
    })

    userEvent.click(addButtons[0]);
    userEvent.click(addButtons[1]);

    expect(cartLinkCount).toHaveTextContent('2');

    const cartLink = screen.getByTestId('shopping-cart-button');

    userEvent.click(cartLink);

    const cleanCartButton = screen.getByRole('button', { name: /Limpar Carrinho/i });
    const productsTitle = screen.getAllByTestId('shopping-cart-product-name');
    const increaseButtons = screen.getAllByTestId('product-increase-quantity');
    const decreaseButtons = screen.getAllByTestId('product-decrease-quantity');
    const productQuantity = screen.getAllByTestId('shopping-cart-product-quantity');
    const totalPrice = screen.getByText(/Total:/i);
    const confirmButton = screen.getByText(/Finalizar Compra/i);

    expect(cleanCartButton).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
    productsTitle.forEach((title, i) => {
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent(/Chá Leão Água Gelada/i);
      expect(increaseButtons[i]).toBeInTheDocument();
      expect(decreaseButtons[i]).toBeInTheDocument();
      expect(productQuantity[i]).toBeInTheDocument();
      expect(productQuantity[i]).toHaveTextContent('1');
    });

    userEvent.click(increaseButtons[0]);
    userEvent.click(decreaseButtons[1]);

    expect(productQuantity[0]).toHaveTextContent('2');
    expect(productsTitle[1]).not.toBeInTheDocument();
    expect(decreaseButtons[1]).not.toBeInTheDocument();
    expect(increaseButtons[1]).not.toBeInTheDocument();
    expect(productQuantity[1]).not.toBeInTheDocument();

    userEvent.click(confirmButton);

    const goBackButton = screen.getByText(/Voltar/i);
    expect(goBackButton).toBeInTheDocument();

    userEvent.click(goBackButton);

    const categories = await screen.findAllByTestId('category');
    const cartLink2 = screen.getByTestId('shopping-cart-button');

    categories.forEach((category) => expect(category).toBeInTheDocument());
    expect(cartLink2).toBeInTheDocument();

    userEvent.click(cartLink2)

    const clearCart = screen.getByRole('button', { name: /Limpar Carrinho/i });

    userEvent.click(clearCart);

    expect(productQuantity[0]).not.toBeInTheDocument();
    expect(productsTitle[0]).not.toBeInTheDocument();
    expect(decreaseButtons[0]).not.toBeInTheDocument();
    expect(increaseButtons[0]).not.toBeInTheDocument();

    const emptyCartMessage = screen.getByTestId('shopping-cart-empty-message');

    expect(emptyCartMessage).toBeInTheDocument();
  });
});