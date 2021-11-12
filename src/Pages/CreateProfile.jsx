import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import '../CreateProfile.css';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastname: '',
      email: '',
      password: '',
      repeatPass: '',
      isButtonDisabled: true,
    }
  }

  buttonValidation = () => {
    const { name, lastname, email, password, repeatPass } = this.state;
    if (name && lastname && email.includes('@' && '.com') && password.length > 8 && repeatPass === password) {
      this.setState({ isButtonDisabled: false })
    } else {
      this.setState({ isButtonDisabled: true })
    }
  }

  inputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.buttonValidation);
  }

  submitUser = () => {
    const { name, lastname, email, password } = this.state;
    const object = {
      name,
      lastname,
      email,
      password,
    }
    if (localStorage.getItem('users')) {
      const array = JSON.parse(localStorage.getItem('users'));
      array.push(object);
      const stringfyArray = JSON.stringify(array);
      localStorage.setItem('users', stringfyArray);
    } else {
      const stringfyArray = JSON.stringify([object]);
      localStorage.setItem('users', stringfyArray);
    }
    sessionStorage.setItem('logged', JSON.stringify(object));
  }

  render() {
    const { inputChange, submitUser, state: { name, lastname, email, password, repeatPass, isButtonDisabled } } = this
    return (
      <div className="register-container">
        <Link className="register-link" to="/"><BsFillArrowLeftCircleFill /></Link>
        <h1>Cadastre-se:</h1>
        <form className="register-form">
          <label htmlFor="name">
            Nome:
            <input className="register-name" id="name" type="text" name="name" onChange={ inputChange } value={ name } />
          </label>
          <label htmlFor="lastname">
            Sobrenome:
            <input className="register-lastname" id="lastname" type="text" name="lastname" onChange={ inputChange } value={ lastname } />
          </label>
          <label htmlFor="email">
            Email:
            <input className="register-email" id="email" type="text" name="email" onChange={ inputChange } value={ email } />
          </label>
          <label htmlFor="password">
            Senha:
            <input className="register-password" id="password" type="password" name="password" onChange={ inputChange } value={ password } />
          </label>
          <label htmlFor="repeatPass">
            Repetir Senha:
            <input className="register-repeatpass" id="repeatPass" type="password" name="repeatPass" onChange={ inputChange } value={ repeatPass } />
          </label>
          <div className="register-btn-container">
            <Link to="/">
              <button disabled={ isButtonDisabled } onClick= { submitUser } className="register-btn" type="button">CADASTRAR</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateProfile;
