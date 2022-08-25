import React, { useEffect} from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const modalsContainer = document.querySelector('#modals');

const Modal = ({title = '', onOverlayClick, children, onCloseClick, escCloseModal}) => {
  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);
    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    }
  }, [])
  const onEscKeydown = (event) => {
    // пробрасывание ф-ции в родительский компонент
    if (event.key === "Escape"){
      escCloseModal();
    }
  };
  return createPortal(
    (<>
      <div className={styles.modal}>
        <div className={styles.head}>
          {title &&
            <h2 className={styles.title}>{title}</h2>
          }

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

Modal.propTypes = {
  title: PropTypes.string,
  onOverlayClick: PropTypes.func.isRequired,
  escCloseModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  onCloseClick: PropTypes.func.isRequired
};

export default Modal;
