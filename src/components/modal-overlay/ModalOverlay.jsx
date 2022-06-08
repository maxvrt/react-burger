import React, { useEffect,createPortal } from 'react';
import styles from './modal-overlay.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const ModalOverlay = ({ onClick }) => {
  return (
    <div className={styles.overlay} onClick={onClick} />
  );
};

export default {ModalOverlay}
