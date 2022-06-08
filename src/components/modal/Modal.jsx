import React, { useEffect} from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const modalsContainer = document.querySelector('#modals');

const Modal = ({title, onOverlayClick, onEscKeydown, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);
    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    }
  }, [])

  return createPortal(
    (<>
      <div className={styles.modal}>
        <h3>{title}</h3>
        {children}
      </div>

      <ModalOverlay onClick={onOverlayClick} />
    </>),
    modalsContainer
  );
};

export default Modal;
