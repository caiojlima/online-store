import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsCart4, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import StarRatings from 'react-star-ratings';
import '../Details.css';

class Details extends Component {
  constructor(props) {
    super(props);

    const user = JSON.parse(sessionStorage.getItem('logged'));

    this.state = {
      rating: 1,
      emailInput: (user) ? user.email : '',
      commentInput: '',
      isButtonDisabled: true,
    };
  }

  changeRating = (newRating) => {
    this.setState({
      rating: newRating,
    });
  }

  addItemCart = (name) => {
    const { location: { state: { availability, thumbnail, price } } } = this.props;
    const items = localStorage.getItem('items');
    const parseItems = JSON.parse(items);
    if (parseItems) {
      if (!parseItems.some(({ name: name2 }) => name2 === name)) {
        parseItems.push({ name, count: 1, availability, thumbnail, price });
        const array = JSON.stringify(parseItems);
        localStorage.setItem('items', array);
      }
    } else {
      const array = JSON.stringify([{ name, count: 1, availability, thumbnail, price }]);
      localStorage.setItem('items', array);
    }
    this.forceUpdate();
  };

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { emailInput } = this.state;
      if (emailInput && emailInput.includes('@' && '.com')) {
        this.setState({ isButtonDisabled: false });
      } else {
        this.setState({ isButtonDisabled: true });
      }
    });
  }

  submitComment = ({ target: { name } }) => {
    const { rating, emailInput, commentInput } = this.state;
    const comment = { name, rating, email: emailInput, comment: commentInput };
    const comments = JSON.parse(localStorage.getItem('comments'));
    if (comments) {
      const array = [...comments, comment];
      localStorage.setItem('comments', JSON.stringify(array));
    } else {
      const array = [comment];
      localStorage.setItem('comments', JSON.stringify(array));
    }
    this.setState({ rating: 1, emailInput: '', commentInput: '', isButtonDisabled: true });
  }

  render() {
    const { location: { state: { title, attributes, thumbnail, price } } } = this.props;
    const { rating, emailInput, commentInput, isButtonDisabled } = this.state;
    const cartCount = JSON.parse(localStorage.getItem('items'));
    const comments = JSON.parse(localStorage.getItem('comments'));
    return (
      <div>
        <div className="links-container">
          <Link className="link" to="/"><BsFillArrowLeftCircleFill /></Link>
          <Link
            className="cart-link" 
            to={ { pathname: '/cart' } }
            data-testid="shopping-cart-button"
          >
            <BsCart4 />
            <span data-testid="shopping-cart-size">
              (
              {(cartCount) ? cartCount.reduce((acc, { count }) => acc + count, 0) : 0}
            </span>
            )
          </Link>
        </div>
        <div className="main-container">
          <h2 data-testid="product-detail-name">
            {`${title}`}
            {' '}
            R$
            <span>{price.toFixed(2).replace('.', ',')}</span>
          </h2>
          <div className="main-info">
            <img src={ thumbnail.replace(/\w.jpg/, 'H.jpg') } alt={ title } />
            <ul>
              {(attributes) && attributes.map(({ name, value_name: value }) => (
                <li key={ name }>{`${name}: ${(value) ? value : 0 }`}</li>
              ))}
            </ul>
          </div>
          <button
            className="card-button details-btn"
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ () => this.addItemCart(title) }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <form>
          <fieldset className="form-container">
            <legend>Deixe Sua Avaliação:</legend>
            <p>
              Email:
            </p>
            {' '}
            <input
              type="email"
              name="emailInput"
              value={ emailInput }
              onChange={ this.handleInput }
            />
            <p>
              Comentário:
              {' '}
            </p>
            <textarea
              data-testid="product-detail-evaluation"
              type="text"
              name="commentInput"
              value={ commentInput }
              onChange={ this.handleInput }
            />
            <p>
              Estrelas:
              {' '}
            </p>
            <StarRatings
              rating={ rating }
              starRatedColor="rgb(61, 128, 75)"
              starEmptyColor="gray"
              changeRating={ this.changeRating }
              numberOfStars={ 5 }
              name="rating"
              starDimension="20px"
              starHoverColor="white"
            />
            <button
              className="rate-btn"
              type="button"
              onClick={ this.submitComment }
              name={ title }
              disabled={ isButtonDisabled }
            >
              Avaliar
            </button>
          </fieldset>
        </form>
        <div className="comments">
          <h2>AVALIAÇÕES E COMENTÁRIOS:</h2>
          {(comments) && (
            comments.map(({ name, rating: rating2, email, comment }) => (name === title)
                && (
                  <div key={ email } className="comment-container">
                    <h3>{email}</h3>
                    <h4>{comment}</h4>
                    <StarRatings
                      rating={ rating2 }
                      starRatedColor="rgb(61, 128, 75)"
                      starEmptyColor="gray"
                      numberOfStars={ 5 }
                      name="rating"
                      starDimension="20px"
                      isSelectable={ false }
                    />
                  </div>
                ))
          )}
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      title: PropTypes.string,
      attributes: PropTypes.arrayOf(PropTypes.object),
      thumbnail: PropTypes.string,
      price: PropTypes.number,
      availability: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default Details;
