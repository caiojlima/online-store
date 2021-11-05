import React, { Component } from 'react';
import '../NotFound.css';
import { Link } from 'react-router-dom';
import { GoHome } from 'react-icons/go';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-container">
        <h1 className="not-found">PÁGINA NÃO ENCONTRADA!</h1>
        <h2>ERRO 404.</h2>
        <Link className="link checkout-link" to="/">
          <div className="back-container">
          <GoHome /><span>Voltar</span>
          </div>
        </Link>
      </div>
    );
  }
}

export default NotFound;
