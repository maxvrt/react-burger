import styles from './reset-page.module.css';
import { Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ForgotPage = () => {
  const [passwordVal, setPasswordVal] = useState('');
  const [codeVal, setCodeVal] = useState('');

  const onChangePassword = e => {
    setPasswordVal(e.target.value);
  };
  const onChangeCode = (e) => {
    setCodeVal(e.target.value)
  }
  const submit = e => {
    e.preventDefault();
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
          <h2 className={styles.title}>Восстановление пароля</h2>
          <PasswordInput
            placeholder={'Введите новый пароль'}
            name={'password'}
            size={'default'}
            errorText={'error'}
            type={'password'}
            value={passwordVal}
            onChange={onChangePassword}
          />
          <Input
            placeholder={'Введите код из письма'}
            name={'name'}
            type={'text'}
            size={'default'}
            errorText={'error'}
            value={codeVal}
            onChange={onChangeCode}
          />
        <div>
          <Button
            disabled={false}
            size='medium'
            type='primary'
          >
            Сохранить
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
