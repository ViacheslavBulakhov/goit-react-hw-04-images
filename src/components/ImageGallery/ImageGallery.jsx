import PropTypes from 'prop-types';
import { ImageGalleryWrap } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

export function ImageGallery({ imagesList }) {
  return (
    <ImageGalleryWrap>
      {imagesList.map(({ largeImageURL, webformatURL, id, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            alt={tags}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </ImageGalleryWrap>
  );
}

ImageGallery.propTypes = {
  imagesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
