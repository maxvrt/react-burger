import React, { useEffect, FC} from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IModal } from '../../types/types';

const modalsContainer:any = document.querySelector('#modals');

const Modal:FC<IModal> = ({title = '', onOverlayClick, children, onCloseClick, escCloseModal}:IModal) => {
  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);
    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    }
  }, [])
  const onEscKeydown = (event: KeyboardEvent) => {
    // пробрасывание ф-ции в родительский компонент
    if (event.key === "Escape"){
      if (escCloseModal) escCloseModal();
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

export default Modal;
