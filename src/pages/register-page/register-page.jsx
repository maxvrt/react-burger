import styles from './register-page.module.css';
import { Logo, Button, Input, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {postRegister} from '../../services/actions/all-actions'

const RegisterPage = () => {
  const [nameVal, setNameVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const { registerSuccess, authData } = useSelector(store =>  ({registerSuccess: store.rootAuth.postRegisterSuccess, authData: store.rootAuth.authData}));
  const dispatch = useDispatch();

  const onChangeName = e => {
    setNameVal(e.target.value);
  };
  const onChangeEmail = e => {
    setEmailVal(e.target.value);
  };
  const onChangePassword = e => {
    setPasswordVal(e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    dispatch(postRegister(nameVal, emailVal, passwordVal))
  }

  if (registerSuccess) {
    console.log(authData +"11111111111");
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
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
