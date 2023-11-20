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
        id={image.id}
        onClick={() => onClick(image.webformatURL)}
      />
    </ImageGalleryItemStyled>
  );
};
