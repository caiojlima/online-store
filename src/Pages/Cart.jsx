import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsFillArrowLeftCircleFill, BsPlusCircleFill } from 'react-icons/bs';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import '../Cart.css';

class Cart extends React.Component {
    increaseCount = ({ target: { name } }) => {
      const items = localStorage.getItem('items');
      const parseItems = JSON.parse(items);
      const obj = parseItems.find(({ name: name2 }) => name2 === name);
      if (obj.availability > obj.count) {
        obj.count += 1;
        parseItems[parseItems.indexOf(obj)] = obj;
        localStorage.setItem('items', JSON.stringify(parseItems));
        this.forceUpdate();
      }
    }

    decreaseCount = ({ target: { name } }) => {
      const items = localStorage.getItem('items');
      const parseItems = JSON.parse(items);
      const obj = parseItems.find(({ name: name2 }) => name2 === name);
      const objIndex = parseItems.indexOf(obj);
      console.log(objIndex)
      console.log('Parse antes ', parseItems)
      if (obj.count > 1) {
        obj.count -= 1;
        parseItems[objIndex] = obj;
        localStorage.setItem('items', JSON.stringify(parseItems));
      } else {
        parseItems.splice(objIndex, 1);
        if (!parseItems.length) {
          localStorage.removeItem('items')
        } else {
          localStorage.setItem('items', JSON.stringify(parseItems));
        }
      }
      this.forceUpdate();
    }

    clearItemsCart = () => {
      localStorage.removeItem('items');
      this.forceUpdate();
    }

    render() {
      const stringArray = localStorage.getItem('items');
      const nameArray = JSON.parse(stringArray);
      return (
        <div>
          <div className="link">
            <Link to="/"><BsFillArrowLeftCircleFill /></Link>
          </div>
          <div className="main-cart-content">
            {(stringArray && nameArray.length) && (
              <div className="clear-container">
              <button
                type="button"
                onClick={ this.clearItemsCart }
              >
                Limpar Carrinho
              </button>
            </div>
            )}
            {(!stringArray) ? (
              <div className="empty-container">
                <p className="empty" data-testid="shopping-cart-empty-message">
                  Seu carrinho está vazio!
                </p>
                  <MdOutlineRemoveShoppingCart className="cart-icon" />
              </div>)
              : (
                <div>
                  {nameArray
                    .map(({ name, count, thumbnail, price }, index) => (
                      <div className="cart-card-container" key={ index }>
                        <h4 className="cart-title" data-testid="shopping-cart-product-name">{name}</h4>
                        <h4 className="cart-price">R${ JSON.stringify(price).replace('.', ',') }</h4>
                        <img className="cart-img" src={ thumbnail } alt={ name } />
                        <div className="count-container">
                          <button
                            className="cart-increase"
                            data-testid="product-increase-quantity"
                            type="button"
                            name={ name }
                            onClick={ this.increaseCount }
                          >
                            +
                          </button>
                          <p
                            className="cart-quantity"
                            data-testid="shopping-cart-product-quantity"
                          >
                            { count }
                          </p>
                          <button
                            className="cart-decrease"
                            data-testid="product-decrease-quantity"
                            type="button"
                            name={ name }
                            onClick={ this.decreaseCount }
                          >
                            -
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              {(stringArray && nameArray.length) && (
                <div className="buy-container">
                  <Link to="/checkout">
                    <button
                      type="button"
                      data-testid="checkout-products"
                    >
                      Finalizar Compra
                    </button>
                  </Link>
                </div>
              )}
            </div>
        </div>
      );
    }
}

Cart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Cart;
