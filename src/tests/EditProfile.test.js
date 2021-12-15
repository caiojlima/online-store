import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import EditProfile from '../Pages/EditProfile';

beforeEach(() => {
  const user = {
    name: 'Caio',
    lastname: 'Lima',
    email: 'caiojlimah@gmail.com',
    password: '123123123'
  };

  sessionStorage.setItem('logged', JSON.stringify(user));
  localStorage.setItem('users', JSON.stringify([user]));
  renderWithRouter(<EditProfile />);
});

afterEach(() => {
  sessionStorage.clear();
});

describe('Testando page EditProfile', () => {
  test('Testando renderização de elementos', () => {
    const pageTitle = screen.getByText(/Edite seu perfil/i);
    const imagePreview = screen.getByRole('img', { name: /profile/i });
    const imageInput = screen.getByLabelText(/Imagem/i);
    const nameInput = screen.getByLabelText(/^Nome/i);
    const lastnameInput = screen.getByLabelText(/Sobrenome/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const saveButton = screen.getByRole('button', { name: /Salvar/i });

    expect(pageTitle).toBeInTheDocument();
    expect(imagePreview).toBeInTheDocument();
    expect(imageInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

  });

  test('Testando se ao modificar as informações de usuário as alterações são feitas', () => {
    const IMG_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk5wFVx7DL3gOWTu6TpNqVZaCl75yccqd6aA&usqp=CAU';
    const pageTitle = screen.getByText(/Edite seu perfil/i);
    const imagePreview = screen.getByRole('img', { name: /profile/i });
    const imageInput = screen.getByLabelText(/Imagem/i);
    const nameInput = screen.getByLabelText(/^Nome/i);
    const lastnameInput = screen.getByLabelText(/Sobrenome/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const saveButton = screen.getByRole('button', { name: /Salvar/i });

    expect(pageTitle).toBeInTheDocument();
    expect(imagePreview).toBeInTheDocument();
    expect(imageInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    expect(nameInput).toHaveValue('Caio');
    expect(lastnameInput).toHaveValue('Lima');
    expect(emailInput).toHaveValue('caiojlimah@gmail.com');
    expect(imageInput).toHaveValue(IMG_URL);

    userEvent.clear(nameInput);
    userEvent.clear(emailInput);
    userEvent.clear(lastnameInput);
    userEvent.clear(imageInput);

    userEvent.type(nameInput, 'Gustavo');
    userEvent.type(imageInput, 'abc');
    userEvent.type(lastnameInput, 'Araújo');
    userEvent.type(emailInput, 'gustavo@bol.com.br');
    userEvent.click(saveButton);

    const logged = JSON.parse(sessionStorage.getItem('logged'));
    const users = JSON.parse(localStorage.getItem('users'));

    expect(logged.name).toBe('Gustavo');
    expect(logged.lastname).toBe('Araújo');
    expect(logged.email).toBe('gustavo@bol.com.br');
    expect(logged.image).toBe('abc');

    expect(users[0].name).toBe('Gustavo');
    expect(users[0].lastname).toBe('Araújo');
    expect(users[0].email).toBe('gustavo@bol.com.br');
    expect(users[0].image).toBe('abc');

  });
});