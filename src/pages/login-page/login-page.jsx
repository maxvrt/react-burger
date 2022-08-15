import styles from './login-page.module.css';
import { Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCookie, getCookie } from '../../utils/cookie'
import { postLogin } from '../../services/actions/all-actions'

const LoginPage = () => {
  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const dispatch = useDispatch();
  const { loginSuccess, authData } = useSelector(store =>  ({loginSuccess: store.rootAuth.postLoginSuccess, authData: store.rootAuth.authData}));
  const location = useLocation();
  const token = getCookie('token');

  const onChangeEmail = e => {
    setEmailVal(e.target.value);
  };
  const onChangePassword = e => {
    setPasswordVal(e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    dispatch(postLogin(emailVal, passwordVal));
  }

  if (loginSuccess && authData.accessToken) {
    const accessToken = authData.accessToken.split('Bearer ')[1];
    const refreshToken = authData.refreshToken;
    setCookie('token', accessToken);
    setCookie('refreshToken', refreshToken);
    return (
      <Redirect
        to={ location.state?.from || '/' }
      />
    );
  }
  if (token) {
    return (
      <Redirect to={location.state?.from || '/'} />
    );
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
          <h2 className={styles.title}>Вход</h2>
          <EmailInput
            placeholder={'E-mail'}
            name={'email'}
            type={'email'}
            size={'default'}
            errorText={'error'}
            value={emailVal}
            onChange={onChangeEmail}
          />
          <PasswordInput
            placeholder={'Пароль'}
            name={'password'}
            size={'default'}
            error={false}
            errorText={'error'}
            type={'password'}
            value={passwordVal}
            onChange={onChangePassword}
          />
        <div>
          <Button
            disabled={false}
            size='medium'
            type='primary'
          >
            Войти
          </Button>
        </div>
      </form>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.footer}`}>
          <p className={`${styles.text}`}>Вы - новый пользователь?</p>
          <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
        </div>
        <div className={`${styles.footer}`}>
          <p className={`${styles.text}`}>Забыли пароль?</p>
          <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
