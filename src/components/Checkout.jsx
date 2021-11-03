import React from 'react';
import { BsFillArrowLeftCircleFill, BsCreditCard2BackFill } from 'react-icons/bs';
import { RiBarcodeFill, RiVisaFill } from 'react-icons/ri';
import { GoHome } from 'react-icons/go';
import { Link } from 'react-router-dom';
import '../Checkout.css';

const brazilStates = ['Acre (AC)', 'Alagoas (AL)', 'Amapá (AP)',
  'Amazonas (AM)', 'Bahia (BA)', 'Ceará (CE)', 'Distrito Federal (DF)',
  'Espírito Santo (ES)', 'Goiás (GO)', 'Maranhão (MA)', 'Mato Grosso (MT)',
  'Mato Grosso do Sul (MS)', 'Minas Gerais (MG)', 'Pará (PA)', 'Paraíba (PB)',
  'Paraná (PR)', 'Pernambuco (PE)', 'Piauí (PI)', 'Rio de Janeiro (RJ)',
  'Rio Grande do Norte (RN)', 'Rio Grande do Sul (RS)', 'Rondônia (RO)',
  'Roraima (RR)', 'Santa Catarina (SC)', 'São Paulo (SP)', 'Sergipe (SE)',
  'Tocantins (TO)'];

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      nomeCompleto: '',
      email: '',
      CPF: '',
      telefone: '',
      CEP: '',
      adress: '',
      city: '',
      stateCountry: 'Selecione seu estado:',
    };
  }

  buttonCheckout = () => {
    localStorage.removeItem('items')
    this.setState({
      nomeCompleto: '',
      email: '',
      CPF: '',
      telefone: '',
      CEP: '',
      adress: '',
      city: '',
      stateCountry: 'Selecione seu estado:',
    });
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const stringArray = localStorage.getItem('items');
    const nameArray = JSON.parse(stringArray);
    const { onChange, buttonCheckout,
      state: {
        email, CPF, telefone, CEP, adress, city, nomeCompleto, stateCountry,
      } } = this;
    return (
      <fieldset className="form-fieldset">
        <div className="links-container">
          <Link className="link" to="/cart"><BsFillArrowLeftCircleFill /></Link>
          <Link className="link" to="/"><GoHome /></Link>
        </div>
        <fieldset className="review-products">
          <h4 className="section-title">Revise seus produtos</h4>
          <div>
            <div>
              {nameArray
                .map(({ name, count, price }) => (
                  <div key={ name }>
                    <h4>{ name }</h4>
                    <p>Quantidade: { count }x</p>
                    <p>R${(Number(price) * count).toFixed(2).replace('.', ',')}</p>
                  </div>
                ))}
            </div>
          </div>
        </fieldset>
        <fieldset className="buyer-infos">
          <h4 className="section-title">Informações do Comprador</h4>
          <div>
            Nome Completo
            <input
              data-testid="checkout-fullname"
              type="text"
              name="nomeCompleto"
              maxLength="40"
              required
              value={ nomeCompleto }
              onChange={ onChange }
            />
          </div>
          <div>
            Email
            <input
              data-testid="checkout-email"
              type="email"
              name="email"
              value={ email }
              maxLength="50"
              required
              onChange={ onChange }
              className="input-email"
            />
          </div>
          <div>
            CPF
            <input
              data-testid="checkout-cpf"
              type="text"
              name="CPF"
              value={ CPF }
              maxLength="11"
              required
              onChange={ onChange }
              className="input-cpf"
            />
          </div>
          <div>
            Telefone
            <input
              data-testid="checkout-phone"
              type="text"
              name="telefone"
              value={ telefone }
              required
              onChange={ onChange }
              className="input-phone"
            />
          </div>
          <div>
            CEP
            <input
              data-testid="checkout-cep"
              type="text"
              name="CEP"
              value={ CEP }
              required
              onChange={ onChange }
              className="input-cep"
            />
          </div>
          <div>
            Endereço
            <input
              data-testid="checkout-address"
              type="text"
              name="adress"
              value={ adress }
              maxLength="200"
              required
              onChange={ onChange }
              className="input-adress"
            />
          </div>
          <div>
            Cidade
            <input
              type="text"
              name="city"
              value={ city }
              maxLength="28"
              required
              onChange={ onChange }
              className="input-city"
            />
          </div>
          <div>
            Estado
            <select
              name="stateCountry"
              required
              value={ stateCountry }
              onChange={ onChange }
            >
              <option>Selecione seu Estado:</option>
              {
                brazilStates.map((value, key) => (
                  <option key={ key }>{value}</option>
                ))
              }
            </select>
          </div>
        </fieldset>
        <fieldset className="payment-method">
          <div className="pay-title">
            <h4 className="section-title">Método de pagamento</h4>
          </div>
          <div className="pay">
            <label htmlFor="boleto">
              <RiBarcodeFill />
              Boleto
              <input
                type="radio"
                name="pay"
                id="boleto"
              />
            </label>
            <label htmlFor="cartaoDeCredito">
              <RiVisaFill />
              Cartão de Crédito
              <input
                type="radio"
                name="pay"
                id="cartaoDeCredito"
              />
            </label>
            <label htmlFor="cartaoDeDebito">
              <BsCreditCard2BackFill />
              Cartão de Débito
              <input
                type="radio"
                name="pay"
                id="cartaoDeDebito"
              />
            </label>
            <label htmlFor="pix">
              <img
                className="pix-img"
                src="https://user-images.githubusercontent.com/741969/99538099-3b7a5d00-298b-11eb-9f4f-c3d0cd4a5280.png"
                alt="pix-logo"
              />
              Pix
              <input
                type="radio"
                name="pay"
                id="pix"
              />
            </label>
          </div>
        </fieldset>
        <div className="btn-container">
        <p className="total">Total: R${(nameArray.reduce((acc, { price, count }) => (acc + (Number(price) * count)), 0).toFixed(2).replace('.', ','))}</p>
          <Link to="/">
            <button
              type="button"
              onClick={ buttonCheckout }
              disabled={ false }
            >
              Finalizar Compra
            </button>
          </Link>
        </div>
      </fieldset>
    );
  }
}

export default Checkout;
