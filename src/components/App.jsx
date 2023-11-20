import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImages } from '../services/apiService';
import { Searchbar } from './Searchbar/Searchbar';
import { AppStyle } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const paramsForNotify = {
  position: 'center-center',
  timeout: 3000,
  width: '400px',
  fontSize: '24px',
};

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoadMore: false,
    isLoading: false,
    url: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ isLoading: true, isLoadMore: false });
      getImages(this.state)
        .then(({ hits: photos, totalHits, hits }) => {
          if (!photos.length) {
            return Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.',
              paramsForNotify
            );
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...hits],

            isLoadMore: page < Math.ceil(totalHits / 12),
          }));
        })
        .catch(error => {
          Notify.failure(
            'Oops! Something went wrong! Try reloading the page or make another choice!',
            paramsForNotify
          );
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({ query, page: 1, images: [] });
  };

  openModal = url => {
    this.setState({ url });
  };

  render() {
    const { images, isLoadMore, isLoading, url } = this.state;
    return (
      <AppStyle>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} openModal={this.openModal} />
        {url && <Modal closeModal={this.openModal} url={url} />}
        {isLoadMore && <Button onClick={() => this.handleLoadMore()} />}
      </AppStyle>
    );
  }
}
