import styles from './forgot-page.module.css';
import { Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { postForgotPass } from '../../services/actions/auth-actions'
import { useDispatch, useSelector, TLocation } from '../../types/types';
import { getCookie } from '../../utils/cookie'

const ForgotPage = () => {
  const [emailVal, setEmailVal] = useState('');
  const dispatch = useDispatch();
  const { forgotPassSuccess, successMessage } = useSelector(store =>  ({forgotPassSuccess: store.rootAuth.postForgotPassSuccess, successMessage: store.rootAuth.message}));
  const location = useLocation<TLocation>();
  const token = getCookie('token');
  const checkAuth = useSelector(store =>  (store.rootAuth.isAuthChecked));

  const onChangeEmail = (e: { target: HTMLInputElement }) => {
    setEmailVal(e.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postForgotPass(emailVal));
  }

  if (forgotPassSuccess) {
    console.log(successMessage);
    return (
      <Redirect
        to={{
          pathname: '/reset-password',
          state: { forgotPage: location }
        }}
      />
    );
  }

  if (checkAuth || token) {
    return (
      <Redirect to={location.state?.from || '/'} />
    );
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
          <h2 className={styles.title}>Восстановление пароля</h2>
          <EmailInput
            name={'email'}
            size={'default'}
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
