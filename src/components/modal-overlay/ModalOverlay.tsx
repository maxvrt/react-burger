import React, { useEffect,FC } from 'react';
import styles from './modal-overlay.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IModal } from '../../types/types';


const ModalOverlay: FC<IModal> = ({ onClick }: IModal) => {
  return (
    <div className={styles.overlay} onClick={onClick} />
  );
};

export default ModalOverlay
