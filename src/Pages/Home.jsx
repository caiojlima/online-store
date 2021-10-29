import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import Categories from '../components/Categories';
import Card from '../components/Card';
import { getProductsFromCategoryAndQuery } from '../services/api';
import '../Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queryInput: '',
      result: undefined,
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
      const { results } = await getProductsFromCategoryAndQuery('', queryInput);
      this.setState({ result: results });
    } else {
      const { results } = await getProductsFromCategoryAndQuery('', name);
      this.setState({ result: results });
    }
  }

  inputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const cartCount = JSON.parse(localStorage.getItem('items'));
    const { inputChange, search,
      state: { queryInput, result } } = this;
    return (
      <div>
        <div className="title-container">
          <h1 className="title">Lojinha do seu Zé</h1>
        </div>
        <div className="header">
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
              Buscar
            </button>
          </div>
          <Link
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
        <div className="subtitle-container">
          <p data-testid="home-initial-message" className="subtitle">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
        <div className="main">
          <div className="categories-container">
            <h3 className="categories-title">Categorias:</h3>
            <Categories search={ search } />
          </div>
          <div className="card-container">
            { (result) && <Card addItemCart={ this.addItemCart } result={ result } /> }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
