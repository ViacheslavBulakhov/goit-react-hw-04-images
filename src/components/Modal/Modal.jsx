import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalWrap } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
export default function Modal({ closeModal, largeUrl, alt }) {
  useEffect(() => {
    function onCloseModal(e) {
      if (e.code === 'Escape') {
        closeModal();
      }
    }

    window.addEventListener('keydown', onCloseModal);

    return () => {
      window.removeEventListener('keydown', onCloseModal);
    };
  }, [closeModal]);

  function onClickCloseModal(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return createPortal(
    <ModalOverlay onClick={onClickCloseModal}>
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
