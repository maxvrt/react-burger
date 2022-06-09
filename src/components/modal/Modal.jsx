import React, { useEffect} from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const modalsContainer = document.querySelector('#modals');

const Modal = ({title, onOverlayClick, onEscKeydown, children, onCloseClick }) => {
  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);
    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    }
  }, [])

  return createPortal(
    (<>
      <div className={styles.modal}>
        <div className={styles.head}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.close}>
            <CloseIcon type="primary" onClick={onCloseClick}/>
          </div>
        </div>
        {children}
      </div>

      <ModalOverlay onClick={onOverlayClick} />
    </>),
    modalsContainer
  );
};

export default Modal;
