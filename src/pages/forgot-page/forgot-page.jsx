import styles from './forgot-page.module.css';
import { Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import {postForgotPass} from '../../services/actions/all-actions'
import { useDispatch, useSelector } from 'react-redux';

const ForgotPage = () => {
  const [emailVal, setEmailVal] = useState('');
  const dispatch = useDispatch();
  const { forgotPassSuccess, successMessage } = useSelector(store =>  ({forgotPassSuccess: store.rootAuth.postForgotPassSuccess, successMessage: store.rootAuth.message}));

  const onChangeEmail = e => {
    setEmailVal(e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    dispatch(postForgotPass(emailVal))
  }

  if (forgotPassSuccess) {
    console.log(successMessage);
    return (
      <Redirect
        to={{
          pathname: '/reset-password'
        }}
      />
    );
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
          <h2 className={styles.title}>Восстановление пароля</h2>
          <EmailInput
            placeholder={'Укажите e-mail'}
            name={'email'}
            type={'email'}
            size={'default'}
            errorText={'error'}
            value={emailVal}
            onChange={onChangeEmail}
          />
        <div>
          <Button
            disabled={false}
            size='medium'
            type='primary'
          >
            Восстановить
          </Button>
        </div>
      </form>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.footer}`}>
          <p className={`${styles.text}`}>Вспомнили пароль?</p>
          <Link className={styles.link} to='/login'>Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;
