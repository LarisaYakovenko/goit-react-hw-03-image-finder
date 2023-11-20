import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchbarStyle,
} from './Searchbar.styled';

import { HiMagnifyingGlass } from 'react-icons/hi2';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    const { value } = this.state;

    return (
      <SearchbarStyle>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton>
            <HiMagnifyingGlass size="24" />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchbarStyle>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
