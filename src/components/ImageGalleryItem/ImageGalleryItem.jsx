import {
  ImageGalleryItemStyled,
  ImageGalleryImg,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <ImageGalleryItemStyled>
      <ImageGalleryImg
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onClick(image.largeImageURL, image.tags)}
      />
    </ImageGalleryItemStyled>
  );
};
