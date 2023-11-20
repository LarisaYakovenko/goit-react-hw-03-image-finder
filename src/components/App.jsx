import { Component } from 'react';
import { getImages } from '../services/apiService';
import { Searchbar } from './Searchbar/Searchbar';
import { Div } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      getImages(this.state).then(({ totalHits, hits }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalPage: totalHits,
        }));
      });
    }
  }

  handleSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  render() {
    return (
      <Div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} onClick={this.openModal} />
      </Div>
    );
  }
}
