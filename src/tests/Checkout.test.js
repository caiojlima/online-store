import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando tela de checkout', () => {
  beforeEach(() => {
    const items = [
      {
        "name": "Miniatura Puma Gt 1967 Carros Nacionais Coleção Antiguidade",
        "count": 1,
        "availability": 1,
        "thumbnail": "http://http2.mlstatic.com/D_857802-MLB46527412415_062021-O.jpg",
        "price": 70
      }
    ]

    const logged = {
      "name": "Caio",
      "lastname": "lima",
      "email": "caiojlimah@gmail.com",
      "password": "cjl27210310"
    }

    localStorage.setItem('items', JSON.stringify(items));
    sessionStorage.setItem('logged', JSON.stringify(logged));
    
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('Testando se o checkout renderiza todos os elementos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/checkout');

    const inputs = screen.getAllByRole('textbox');
    const select = screen.getByRole('combobox');
    const radios = screen.getAllByRole('radio');
    const finishPurchase = screen.getByRole('button');

    expect(select).toBeInTheDocument();
    expect(finishPurchase).toBeInTheDocument();
    expect(finishPurchase).toBeDisabled();
    expect(inputs).toHaveLength(7);
    expect(radios).toHaveLength(4);
    inputs.forEach((input) => expect(input).toBeInTheDocument());
    radios.forEach((radio) => expect(radio).toBeInTheDocument());
  });

  test('Testa funcionamento do checkout e mensagem de compra realizada', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/checkout');

    const inputs = screen.getAllByRole('textbox');
    const select = screen.getByRole('combobox');
    const radios = screen.getAllByRole('radio');
    const finishPurchase = screen.getByRole('button');

    expect(inputs[0]).toHaveValue('Caio lima');
    expect(inputs[1]).toHaveValue('caiojlimah@gmail.com');

    userEvent.type(inputs[2], '12312312323');
    userEvent.type(inputs[3], '71992932374');
    userEvent.type(inputs[4], '40294653');
    userEvent.type(inputs[5], 'Rua Edivaldo Pereira 64');
    userEvent.type(inputs[6], 'Salvador');
    userEvent.selectOptions(select, 'Bahia (BA)');
    userEvent.click(radios[3]);

    expect(finishPurchase).not.toBeDisabled();

    userEvent.click(finishPurchase);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');

    const buyPopout = await screen.findByText(/Compra realizada/i);

    expect(buyPopout).toBeInTheDocument();

  });
});
