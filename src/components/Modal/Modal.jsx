import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalWrap } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
export default function Modal({ closeModal, largeUrl, alt }) {
  useEffect(() => {
    window.addEventListener('keydown', onCloseModal);

    return () => {
      window.removeEventListener('keydown', onCloseModal);
    };
  }, []);

  function onCloseModal(e) {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      closeModal();
    }
  }

  return createPortal(
    <ModalOverlay onClick={onCloseModal}>
      <ModalWrap>
        <img src={largeUrl} alt={alt} />
      </ModalWrap>
    </ModalOverlay>,
    modalRoot
  );
}
Modal.propTypes = {
  largeUrl: PropTypes.string,
  alt: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
