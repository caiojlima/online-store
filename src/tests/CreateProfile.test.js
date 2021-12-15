import React from 'react'
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando a page CreateProfile', () => {
  test('Testa se a tela de criação renderiza os elementos corretos', () => {
    const { history } = renderWithRouter(<App />);
    const createProfileLink = screen.getByText(/cadastre-se!/i);
    
    userEvent.click(createProfileLink);
    
    const { location: { pathname } } = history;
    
    expect(pathname).toBe('/profile/new');

    const pageTitle = screen.getByText('Cadastre-se:');
    const nameInput = screen.getByLabelText(/^Nome/i);
    const lastnameInput = screen.getByLabelText(/sobrenome/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const repeatPassInput = screen.getByLabelText(/Repetir Senha/i);
    const registerButton = screen.getByRole('button', { name: /CADASTRAR/i });

    expect(pageTitle).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(repeatPassInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test('Testando a criação de usuário', () => {
    const { history } = renderWithRouter(<App />);
    const createProfileLink = screen.getByText(/cadastre-se!/i);
    
    userEvent.click(createProfileLink);
    
    const { location: { pathname } } = history;
    
    expect(pathname).toBe('/profile/new');

    const pageTitle = screen.getByText('Cadastre-se:');
    const nameInput = screen.getByLabelText(/^Nome/i);
    const lastnameInput = screen.getByLabelText(/sobrenome/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const repeatPassInput = screen.getByLabelText(/Repetir Senha/i);
    const registerButton = screen.getByRole('button', { name: /CADASTRAR/i });

    expect(pageTitle).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(repeatPassInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeDisabled();

    userEvent.type(nameInput, 'Caio');
    userEvent.type(lastnameInput, 'Lima');
    userEvent.type(emailInput, 'caiojlimah@gmail.com');
    userEvent.type(passwordInput, '123123123');
    userEvent.type(repeatPassInput, '123123123');
    expect(registerButton).not.toBeDisabled();
    userEvent.click(registerButton);

    const{ location: { pathname: pathname2 } } = history;

    expect(pathname2).toBe('/');

    const user = JSON.parse(localStorage.getItem('users'));
    const logged = JSON.parse(sessionStorage.getItem('logged'));

    expect(logged.name).toBe('Caio');
    expect(logged.lastname).toBe('Lima');
    expect(logged.email).toBe('caiojlimah@gmail.com');

    expect(user[0].name).toBe('Caio');
    expect(user[0].lastname).toBe('Lima');
    expect(user[0].email).toBe('caiojlimah@gmail.com');

  })
});