import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import Home from '../Pages/Home';
import categories from './mocks/categories';
import getCategoriesResult from './mocks/api';
const api = require('../services/api');

beforeEach(() => {
  jest.spyOn(api, 'getCategories').mockResolvedValue(getCategoriesResult);
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

    expect(title).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(register).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  test('Verificando se o há um input de busca, um botão, um link para o carrinho e a mensagem inicial', () => {
    const message = 'Busque uma palavra-chave ou selecione uma categoria';
    const searchInput = screen.getByTestId('query-input');
    const searchButton = screen.getByTestId('query-button');
    const cartLink = screen.getByTestId('shopping-cart-button');
    const initialMessage = screen.getByText(message);

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
    expect(initialMessage).toBeInTheDocument();
  });

  test('Verifica se há uma seção com as categorias disponíveis', async () => {    
    const categoriesTitle = screen.getByText(/categorias:/i);
    const categoriesButtons = await screen.findAllByTestId('category');

    expect(categoriesTitle).toBeInTheDocument();
    expect(categoriesButtons).toHaveLength(32);
    categoriesButtons.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(categories[index]);
    });
  });

  test('Verifica se o footer foi renderizado', () => {
    const githubSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvo39Igv-r_ajdF0ZCLlcqgTfixAl7nelyUg&usqp=CAU';
    const linkedinSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4z_aW0bHEtkMp1DY0TGx2ssD35JQcpBvuxQ&usqp=CAU'
    const footerName = screen.getByText(/Criado por/i);
    const githubImage = screen.getByAltText(/github link/i);
    const linkedinImage = screen.getByAltText(/linkedin link/i);

    expect(footerName).toBeInTheDocument();
    expect(githubImage).toBeInTheDocument();
    expect(linkedinImage).toBeInTheDocument();
    expect(githubImage.src).toBe(githubSrc);
    expect(linkedinImage.src).toBe(linkedinSrc);
  });
});
