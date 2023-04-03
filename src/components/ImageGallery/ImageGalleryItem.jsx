import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';

import {
  ImageGalleryItemImage,
  ImageGalleryItemStyled,
} from './ImageGallery.styled';

export const ImageGalleryItem = ({ url, alt, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ImageGalleryItemStyled>
      <ImageGalleryItemImage
        src={url}
        alt={alt}
        loading="lazy"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          largeUrl={largeImageURL}
          alt={alt}
        />
      )}
    </ImageGalleryItemStyled>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
