import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import categories from './mocks/categories';
import getCategoriesResult from './mocks/api_MOCK';
import searchResults from './mocks/result_MOCK';
import categoriesResult from './mocks/categoriesResult_MOCK';
const api = require('../services/api');

beforeEach(() => {
  jest.spyOn(api, 'getCategories').mockResolvedValue(getCategoriesResult); 
});

describe('Verificando se todos os elementos são carregados na página Home', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
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

describe('Testando funcionamento dos links', () => {
  test('Verifica se ao clicar no link `Cadastre-se` leva-se a página correta', async () => {
    const { history } = renderWithRouter(<App />);
    const registerLink = screen.getByRole('link', { name: /cadastre-se!/i });

    expect(registerLink).toBeInTheDocument();

    const categorys = await screen.findAllByTestId('category');

    expect(categorys[0]).toBeInTheDocument();
    userEvent.click(registerLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/profile/new');
  });

  test('Verifica se ao clicar no link para o cart leva-se a página correta', async () => {
    const { history } = renderWithRouter(<App />);
    const cartLink = screen.getByTestId('shopping-cart-button');

    expect(cartLink).toBeInTheDocument();

    const categorys = await screen.findAllByTestId('category');

    expect(categorys[0]).toBeInTheDocument();
    
    userEvent.click(cartLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/cart');
  });
});

describe('Testando funcionamento do Login de Usuário', () => {
  test('Testa se ao cadastar um usuário, é mostrado suas informações', async () => {
    const { history } = renderWithRouter(<App />);
    const registerLink = screen.getByRole('link', { name: /cadastre-se!/i });

    expect(registerLink).toBeInTheDocument();

    const categorys = await screen.findAllByTestId('category');

    expect(categorys[0]).toBeInTheDocument();
    userEvent.click(registerLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/profile/new');

    const firstnameInput = screen.getByLabelText(/^Nome:$/i);
    const lastnameInput = screen.getByLabelText(/Sobrenome:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/^Senha:$/i);
    const repeatPassInput = screen.getByLabelText(/Repetir Senha:/i);
    const submitButton = screen.getByRole('button');

    expect(firstnameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(repeatPassInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(submitButton).toBeDisabled();

    userEvent.type(firstnameInput, 'Caio');
    userEvent.type(lastnameInput, 'Lima');
    userEvent.type(emailInput, 'caiojlimah@gmail.com');
    userEvent.type(passwordInput, '123123123');
    userEvent.type(repeatPassInput, '123123123');

    expect(submitButton).not.toBeDisabled();

    userEvent.click(submitButton);
    
    const { location: { pathname: pathname2 } } = history;

    expect(pathname2).toBe('/');

    const profileURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk5wFVx7DL3gOWTu6TpNqVZaCl75yccqd6aA&usqp=CAU';
    const greetings = screen.getByTestId('welcome');
    const profileImage = screen.getByAltText(/profile/i);
    const editProfile = screen.getByRole('button', { name: /Editar Perfil/i });
    const logout = screen.getByRole('button', { name: /Sair/i }); 

    expect(greetings).toBeInTheDocument();
    expect(greetings).toHaveTextContent('Bem Vindo(a): Caio Lima!');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', profileURL)
    expect(editProfile).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });
});

describe('Testando pesquisa de produto por texto e por categoria, e a ordenação de produtos', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('verifica se ao pesquisar por um tipo produto, os elementos aparecem na tela', async () => {
    jest.spyOn(api, 'getProductsFromCategoryAndQuery').mockResolvedValue(searchResults);

    const queryInput = screen.getByTestId('query-input');
    const queryButton = screen.getByTestId('query-button');

    expect(queryInput).toBeInTheDocument();
    expect(queryButton).toBeInTheDocument();

    userEvent.type(queryInput, 'Computador');
    userEvent.click(queryButton);

    const loading = screen.getByTestId('loading');

    expect(loading).toBeInTheDocument();

    const select = await screen.findByRole('combobox');
    const products = await screen.findAllByTestId('product');

    expect(loading).not.toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(products).toHaveLength(50);
    products.forEach((product) => {
      expect(product).toBeInTheDocument();
    });
  });

  test('Verifica se ao clicar em uma categoria, os elementos são renderizados', async () => {
    jest.spyOn(api, 'getProductsFromCategoryAndQuery').mockResolvedValue(categoriesResult);

    const foodAndBeverageCategory = await screen.findByRole('button', { name: /Alimentos e Bebidas/i });

    expect(foodAndBeverageCategory).toBeInTheDocument();

    userEvent.click(foodAndBeverageCategory);

    const loading = screen.getByTestId('loading');

    expect(loading).toBeInTheDocument();

    const select = await screen.findByRole('combobox');
    const products = await screen.findAllByTestId('product');

    expect(loading).not.toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(products).toHaveLength(50);
    products.forEach((product) => {
      expect(product).toBeInTheDocument();
    });
  });

  test('Testando se a ordenação de produtos funciona corretamente', async () => {
    jest.spyOn(api, 'getProductsFromCategoryAndQuery').mockResolvedValue(categoriesResult);

    const foodAndBeverageCategory = await screen.findByRole('button', { name: /Alimentos e Bebidas/i });

    expect(foodAndBeverageCategory).toBeInTheDocument();

    userEvent.click(foodAndBeverageCategory);

    const loading = screen.getByTestId('loading');

    expect(loading).toBeInTheDocument();

    const select = await screen.findByRole('combobox');
    const products = await screen.findAllByTestId('product');

    expect(loading).not.toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(products).toHaveLength(50);
    products.forEach((product) => {
      expect(product).toBeInTheDocument();
    });
    expect(products[0]).toHaveTextContent('Chá Leão Água Gelada - Abacaxi E Hortelã 10 Sachês');

    userEvent.selectOptions(select, 'a-z');

    const option = await screen.findByRole('option', { name: 'A-Z' });
    const sortedProducts = await screen.findAllByTestId('product');

    expect(option.selected).toBe(true);
    expect(sortedProducts[0]).toHaveTextContent('4x Biscoito Bahlsen Choco Leibnez Milk 125g');
  });
});

describe('Testando botão dos cards e o link de mais detalhes', () => {
  beforeEach(() => {
    jest.spyOn(api, 'getProductsFromCategoryAndQuery').mockResolvedValue(categoriesResult);
  });
  test('Verifica se ao clicar no botão, a contagem do carrinho é atualizada', async () => {
    renderWithRouter(<App />);
    const foodAndBeverageCategory = await screen.findByRole('button', { name: /Alimentos e Bebidas/i });

    expect(foodAndBeverageCategory).toBeInTheDocument();

    userEvent.click(foodAndBeverageCategory);

    const addToCartButtons = await screen.findAllByRole('button', { name: /Adicionar ao carrinho/i });

    for(let i = 1; i <= 10; i += 1) {
      userEvent.click(addToCartButtons[0]);
    }

    const cartCount = screen.getByTestId('shopping-cart-size');

    expect(cartCount).toHaveTextContent(/1/i);
  });

  test('Testando se o link de `Mais Detalhes` leva até a página correta', async () => {
    const { history } = renderWithRouter(<App />)
    const foodAndBeverageCategory = await screen.findByRole('button', { name: /Alimentos e Bebidas/i });

    expect(foodAndBeverageCategory).toBeInTheDocument();

    userEvent.click(foodAndBeverageCategory);

    const moreDetailsLinks = await screen.findAllByRole('link', { name: /Mais Detalhes/i });

    userEvent.click(moreDetailsLinks[0]);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/details/MLB1915507545');
  });
});