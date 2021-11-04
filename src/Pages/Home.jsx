import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsCart4, BsSearch } from 'react-icons/bs';
import Categories from '../components/Categories';
import Card from '../components/Card';
import Loading from '../components/Loading';
import { getProductsFromCategoryAndQuery } from '../services/api';
import '../Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queryInput: '',
      result: undefined,
      loading: false,
    };
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

  search = async ({ target: { name } }) => {
    if (!name) {
      const { queryInput } = this.state;
      this.setState({ loading: true });
      const { results } = await getProductsFromCategoryAndQuery('', queryInput);
      this.setState({ result: results, loading: false });
    } else {
      this.setState({ loading: true });
      const { results } = await getProductsFromCategoryAndQuery('', name);
      this.setState({ result: results, loading: false });
    }
  }

  inputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const cartCount = JSON.parse(localStorage.getItem('items'));
    const { inputChange, search,
      state: { queryInput, result, loading } } = this;
    return (
      <div>
        <div className="header">
          <h1 className="title">ONLINE STORE</h1>
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
          {(!result) && (
            <p data-testid="home-initial-message" className="subtitle">
              Busque uma palavra-chave ou selecione uma categoria
            </p>
          )}
        </div>
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
      </div>
    );
  }
}

export default Home;
