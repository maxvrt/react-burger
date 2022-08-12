import styles from './profile-page.module.css';
import { Button, EmailInput, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../services/actions/all-actions'

const ProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  const { getUserSuccess, authData } = useSelector(store =>  ({getUserSuccess: store.rootAuth.getUserSuccess, authData: store.rootAuth.authData}));
  const [nameUser, setName] = useState('111')
  const [emailUser, setEmail] = useState('111')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setName(authData.name);
    setEmail(authData.email);
  }, [authData.name]);

  if (getUserSuccess) {
    console.log(nameUser+' '+emailUser);
  }

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
            value={`${nameUser}`}
            onChange={onChange}
          />
          <EmailInput
            placeholder={'Логин'}
            name={'email'}
            type={'email'}
            size={'default'}
            error={false}
            errorText={'error'}
            value={`${emailUser}`}
            onChange={onChange}
          />
          <PasswordInput
            placeholder={'Пароль'}
            name={'password'}
            size={'default'}
            error={false}
            errorText={'error'}
            type={'password'}
            value={password}
            onChange={onChange}
          />
      </form>

    </div>
  );
};

export default ProfilePage;
