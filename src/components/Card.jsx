import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa';
import '../Card.css';

class Card extends React.Component {
  render() {
    const { result, addItemCart } = this.props;
    return (
      <div className="card">
        { result.map(({
          id, title, thumbnail, price, attributes, available_quantity: availability,
          shipping: { free_shipping: free },
        }) => (
          <div
            className="card-content"
            data-testid="product"
            key={ id }
          >
            <div className="card-img-container">
              <img src={ thumbnail } alt="imagem" className="card-img" />
            </div>
            <div className="title-container">
              <p className="card-title">
                { (title.length) ? title : `${title.split('').splice(0, 52).join('')}...` }
              </p>
            </div>
            <div className="free-container">
              {(free
                && (
                  <p className="free-shipping" data-testid="free-shipping">
                    <FaTruck className="free-icon" />
                    {' '}
                    Free
                  </p>)
                )}
            </div>
            <div className="card-pay-container">
              <p className="card-price">
                Valor: R$
                <span>
                  { price.toFixed(2).replace('.', ',') }
                </span>
              </p>
              <button
                className="card-button"
                data-testid="product-add-to-cart"
                type="button"
                onClick={ () => addItemCart(title, availability, thumbnail, price) }
              >
                Adicionar ao carrinho
              </button>
            </div>
            <Link
              className="details"
              data-testid="product-detail-link"
              to={ {
                pathname: `/details/${id}`,
                state: {
                  title,
                  thumbnail,
                  price,
                  attributes,
                  availability,
                },
              } }
            >
              Mais Detalhes
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

Card.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
  addItemCart: PropTypes.func.isRequired,
};
export default Card;
