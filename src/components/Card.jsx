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
            <p className="card-title">
              { title }
            </p>
            <p className="card-price">
              R$
              <span>
                { price }
              </span>
            </p>
            <img src={ thumbnail } alt="imagem" className="card-img" />
            <button
              className="card-button"
              data-testid="product-add-to-cart"
              type="button"
              onClick={ () => addItemCart(title, availability, thumbnail, price) }
            >
              Comprar
            </button>
            <Link
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
            {(free
            && (
              <p data-testid="free-shipping">
                <FaTruck />
                Frete Grátis
              </p>)
            )}
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
