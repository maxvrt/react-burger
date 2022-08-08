import styles from './profile-page.module.css';
import { Button, EmailInput, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, NavLink } from 'react-router-dom';
import { useState } from 'react';

const ProfilePage = () => {

  const submit = e => {
    e.preventDefault();
  }
  const onChange  = e => {
    e.preventDefault();
  }

  return (
    <div className={styles.container}>
      <ul className={`${styles.list}`}>
        <li className={`${styles.el}`}>
          <NavLink className={styles.link} activeClassName={styles.aLink} to='profile'>Профиль</NavLink>
        </li>
        <li className={`${styles.el}`}>
          <NavLink className={styles.link} activeClassName={styles.aLink} to='/profile/orders'>История заказов</NavLink>
        </li>
        <li className={`${styles.el}`}>
          <NavLink className={styles.link} activeClassName={styles.aLink} to='/profile/orders/:id'>Выход</NavLink>
        </li>
      </ul>

      <form className={styles.form} onSubmit={submit}>
          <Input
            placeholder={'Имя'}
            name={'name'}
            type={'text'}
            size={'default'}
            error={false}
            errorText={'error'}
            value={'Марк'}
            onChange={onChange}
          />
          <EmailInput
            placeholder={'Логин'}
            name={'email'}
            type={'email'}
            size={'default'}
            error={false}
            errorText={'error'}
            value={'mail@mail.ru'}
            onChange={onChange}
          />
          <PasswordInput
            placeholder={'Пароль'}
            name={'password'}
            size={'default'}
            error={false}
            errorText={'error'}
            type={'password'}
            value={'*******'}
            onChange={onChange}
          />
      </form>

    </div>
  );
};

export default ProfilePage;
