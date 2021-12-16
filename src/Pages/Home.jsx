import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsCart4, BsSearch } from 'react-icons/bs';
import Categories from '../components/Categories';
import Card from '../components/Card';
import Loading from '../components/Loading';
import BuyDone from '../components/BuyDone';
import { getProductsFromCategoryAndQuery } from '../services/api';
import '../Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    const results = JSON.parse(sessionStorage.getItem('results'));

    this.state = {
      queryInput: '',
      result: (results) ? results : undefined,
      loading: false,
      email: '',
      senha: '',
      sort: 'default',
      placeholder:'',
      login: false,
      user: '',
      image: '',
      buy: false,
    };
  }

  componentDidMount() {
    this.checkIfIsLogged();
    this.purchase();
  }

  addItemCart = (name, availability, thumbnail, price) => {
    const items = localStorage.getItem('items');
    const parseItems = JSON.parse(items);
    if (parseItems) {
      if (!parseItems.some(({ name: name2 }) => name2 === name)) {
        parseItems.push({ name, count: 1, availability, thumbnail, price });
        const array = JSON.stringify(parseItems);
        localStorage.setItem('items', array);
      } else {
        const items2 = localStorage.getItem('items');
        const parseItems2 = JSON.parse(items2);
        const obj = parseItems2.find(({ name: name2 }) => name2 === name);
        obj.count += 1;
        parseItems2[parseItems2.indexOf(obj)] = obj;
        localStorage.setItem('items', JSON.stringify(parseItems2));
      }
    } else {
      const array = JSON.stringify([{ name, count: 1, availability, thumbnail, price }]);
      localStorage.setItem('items', array);
    }
    this.forceUpdate();
  };  

  sortItens = (value) => {
    const { result } = this.state;
    if ( value === 'maior') {
      result.sort((a, b) => b.price - a.price);
      sessionStorage.setItem('results', JSON.stringify(result));
      this.setState({ result: result });
    } else if ( value === 'menor') {
      result.sort((a, b) => a.price - b.price);
      sessionStorage.setItem('results', JSON.stringify(result));
      this.setState({ result: result });
    } else if (value === 'a-z') {
      result.sort((a, b) => a.title.localeCompare(b.title));
      sessionStorage.setItem('results', JSON.stringify(result));
      this.setState({ result: result });
    } else if (value === 'z-a') {
      result.sort((a, b) => -(a.title.localeCompare(b.title)));
      sessionStorage.setItem('results', JSON.stringify(result));
      this.setState({ result: result });
    } else {
      result.sort((a, b) => b.sold_quantity - a.sold_quantity);
      sessionStorage.setItem('results', JSON.stringify(result));
      this.setState({ result: result });
    }
  }

  search = async ({ target: { name } }) => {
    if (!name) {
      const { queryInput } = this.state;
      this.setState({ loading: true });
      const { results } = await getProductsFromCategoryAndQuery('', queryInput);
      sessionStorage.setItem('results', JSON.stringify(results));
      this.setState({ result: results, loading: false });
    } else {
      this.setState({ loading: true });
      const { results } = await getProductsFromCategoryAndQuery('', name);
      sessionStorage.setItem('results', JSON.stringify(results));
      this.setState({ result: results, loading: false });
    }
  }

  inputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    if (name === 'sort') {
      this.sortItens(value);
    }
  }

  loginCheck = () => {
    const { email, senha } = this.state;
    const arrayUsers = JSON.parse(localStorage.getItem('users'));
    const user = arrayUsers.find(user => user.email === email);
    if (user && user.password === senha) {
      this.setState({ login:true, user: `${user.name} ${user.lastname}`, image: user.image });
      sessionStorage.setItem('logged', JSON.stringify(user));
    } else {
      this.setState({ email:'', senha:'', placeholder: 'DADOS INVÁLIDOS!' });
    }
  }

  checkIfIsLogged = () => {
    if (sessionStorage.getItem('logged')) {
      const user = JSON.parse(sessionStorage.getItem('logged'));
      this.setState({ 
        login:true,
        user: `${user.name} ${user.lastname}`,
        image: (user.image) ? user.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk5wFVx7DL3gOWTu6TpNqVZaCl75yccqd6aA&usqp=CAU',
      });
    }
  }

  logout = () => {
    sessionStorage.removeItem('logged');
    this.setState({ login: false, user: '', email: '', senha: '' });
  }

  purchase = () => {
    const buy = JSON.parse(sessionStorage.getItem('buy'));
    if (buy) {
      this.setState({ buy });
      sessionStorage.setItem('buy', 'false');
    }
  }

  render() {
    const cartCount = JSON.parse(localStorage.getItem('items'));
    const { inputChange, search, loginCheck, logout,
      state: { queryInput, result, loading, email, senha, placeholder, login, user, sort, image, buy } } = this;
    return (
      <div>
        <div className="header">
          <h1 className="title">ONLINE STORE</h1>
          {(login) ? (
            <div className="welcome-container">
              <div className="image-container">
                <img src={ (image) ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk5wFVx7DL3gOWTu6TpNqVZaCl75yccqd6aA&usqp=CAU' } alt="profile" />
              </div>
              <h3 className="welcome" data-testid="welcome">Bem Vindo(a): {`${user}`}!</h3>
              <div className="welcome-btn-container">
                <Link  to="/profile/edit"><button className="edit-profile" type="button">Editar Perfil</button></Link>
                <button className="edit-profile" type="button" onClick={ logout }>Sair</button>
              </div>
            </div>
          ) : (
            <form className="login-container">
            <div className="input-container">
              <label htmlFor="email">
                Email:
                <input className="email-home" placeholder={ placeholder } type="text" name="email" id="email" onChange={ inputChange } value={ email } />
              </label>
              <label htmlFor="senha">
                Senha:
                <input className="password-home" placeholder={ placeholder } type="password" name="senha" id="senha" onChange={ inputChange } value={ senha } />
              </label>
              <button className="btn-login" onClick={ loginCheck } type="button">Entrar</button>
              </div>
            <div className="register-home-container">
              <p>Novo? <Link to="/profile/new" className="register-home">Cadastre-se!</Link></p>
            </div>
          </form>
          )}
        </div>
        <div className="nav">
          <div className="search-container">
            <input
              className="search-input"
              data-testid="query-input"
              type="text"
              name="queryInput"
              value={ queryInput }
              onChange={ inputChange }
            />
            <button
              className="search-button"
              type="button"
              data-testid="query-button"
              onClick={ search }
            >
              <BsSearch />
            </button>
          </div>
          <div className="cart-link-container">
              <Link
              className="cart-link"
              to={ { pathname: '/cart' } }
              data-testid="shopping-cart-button"
              >
              <BsCart4 />
              (
              <span data-testid="shopping-cart-size">
                {(cartCount) ? cartCount.reduce((acc, { count }) => acc + count, 0) : 0}
              </span>
              )
              </Link>
            </div>  
        </div>
        <div className="subtitle-container">
          {(!result) ? (
            <p data-testid="home-initial-message" className="subtitle">
              Busque uma palavra-chave ou selecione uma categoria
            </p>
          ) : (
            <select className="sort" name="sort" id="sort" defaultValue={ sort } onChange={ inputChange }>
              <option value="default" disabled>Ordene por:</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="menor">Menor Valor</option>
              <option value="maior">Maior Valor</option>
              <option value="vendidos">Mais Vendidos</option>
            </select>
          )}
        </div>
        {!!buy && <BuyDone />}
        <div className="main">
          <div className="categories-container">
            <h3 className="categories-title">Categorias:</h3>
            <Categories search={ search } />
          </div>
          <div className="card-container">
            { (loading) && <Loading /> }
            { (result) && <Card addItemCart={ this.addItemCart } result={ result } /> }
          </div>
        </div>
        <footer>
          <p>Criado por <a href="https://www.linkedin.com/in/caio-limah/" target="_blank">Caio Lima</a></p>
          <div className="footer-links-container">
            <div className="github-container">
              <a href="https://github.com/caiojlima/online-store" target="_blank"><img className="github" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvo39Igv-r_ajdF0ZCLlcqgTfixAl7nelyUg&usqp=CAU" alt="github link" /></a>
            </div>
            <div className="linkedin-container">
            <a href="https://www.linkedin.com/in/caio-limah/" target="_blank"><img  className="linkedin" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4z_aW0bHEtkMp1DY0TGx2ssD35JQcpBvuxQ&usqp=CAU" alt="linkedin link" /></a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;
