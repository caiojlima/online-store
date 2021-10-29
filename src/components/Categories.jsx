import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import '../Categories.css';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.getNames();
  }

  getNames = async () => {
    const result = await getCategories();
    this.setState({
      categories: result,
    });
  }

  render() {
    const { search } = this.props;
    const { categories } = this.state;
    return (
      <div className="categories">
        { categories.map(({ name }) => (
          <button
            type="button"
            data-testid="category"
            name={ name }
            key={ name }
            onClick={ search }
          >
            { name }
          </button>
        ))}
      </div>
    );
  }
}

Categories.propTypes = {
  search: PropTypes.func.isRequired,
};

export default Categories;
