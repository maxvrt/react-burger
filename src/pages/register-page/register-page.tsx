import styles from './register-page.module.css';
import { Logo, Button, Input, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector, TLocation } from '../../types/types';
import { setCookie, getCookie } from '../../utils/cookie'
import { postRegister } from '../../services/actions/auth-actions'

const RegisterPage = () => {
  const [nameVal, setNameVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const { registerSuccess, authData } = useSelector(store =>  ({registerSuccess: store.rootAuth.postRegisterSuccess, authData: store.rootAuth.authData}));
  const dispatch = useDispatch();
  const token = getCookie('token');
  const location = useLocation<TLocation>();
  const checkAuth = useSelector(store =>  (store.rootAuth.isAuthChecked));

  const onChangeName = (e: { target: HTMLInputElement }) => {
    setNameVal(e.target.value);
  };
  const onChangeEmail = (e: { target: HTMLInputElement }) => {
    setEmailVal(e.target.value);
  };
  const onChangePassword = (e: { target: HTMLInputElement }) => {
    setPasswordVal(e.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postRegister(nameVal, emailVal, passwordVal))
  }

  if (checkAuth || (registerSuccess && authData.accessToken)) {
    return (
      <Redirect to={location?.state?.from || '/'} />
    );
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
          <h2 className={styles.title}>Регистрация</h2>
          <Input
            placeholder={'Имя'}
            name={'name'}
            type={'text'}
            size={'default'}
            errorText={'error'}
            value={nameVal}
            onChange={onChangeName}
          />
          <EmailInput
            name={'email'}
            size={'default'}
            value={emailVal}
            onChange={onChangeEmail}
          />
          <PasswordInput
            name={'password'}
            size={'default'}
            value={passwordVal}
            onChange={onChangePassword}
          />
        <div>
          <Button
            disabled={false}
            size='medium'
            type='primary'
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>

      <div className={`${styles.footer}`}>
        <p>Уже зарегистрированы?</p>
        <Link className={styles.link} to='/login'>Войти</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
