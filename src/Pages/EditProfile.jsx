import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import '../EditProfile.css';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    const user = JSON.parse(sessionStorage.getItem('logged'));

    this.state = {
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      image: (user.image)? user.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk5wFVx7DL3gOWTu6TpNqVZaCl75yccqd6aA&usqp=CAU',
    }
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  saveButton = () => {
    const { email, lastname, name, image } = this.state;
    const users = JSON.parse(localStorage.getItem('users'));
    const logger = JSON.parse(sessionStorage.getItem('logged'));
    const index = users.findIndex((elem) => elem.name === logger.name)
    const newUser = {
      name,
      lastname,
      email,
      password: logger.password,
      image,
    };
    users[index] = newUser;
    localStorage.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('logged', JSON.stringify(newUser));
  }

  render() {
    const { handleInput, saveButton, state: { name, lastname, email, image } } = this;
    return (
      <div>
        <div className="edit-link-container">
          <Link className="link edit-link" to="/"><BsFillArrowLeftCircleFill /></Link>          
        </div>
        <form className="edit-form">
          <h1>Edite seu perfil</h1>
          <div className="image-preview-container">
            { (image) && <img src={ image } alt="profile" /> }
          </div>
          <label htmlFor="image">
            Imagem:
            <input className="image-edit" type="text" name="image" value={ image } onChange={ handleInput } />
          </label>
          <label htmlFor="name">
            Nome:
            <input className="name-edit" type="text" name="name" value={ name } onChange={ handleInput } />
          </label>
          <label htmlFor="lastname">
            Sobrenome:
            <input className="lastname-edit" type="text" name="lastname" value={ lastname } onChange={ handleInput } />
          </label>
          <label htmlFor="email">
            Email:
            <input className="email-edit" type="text" name="email" value={ email } onChange={ handleInput } />
          </label>
          <Link to="/">
            <button className="button-save" type="button" onClick={ saveButton }>Salvar</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default EditProfile;
