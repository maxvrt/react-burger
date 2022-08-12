import styles from './profile-page.module.css';
import { Button, EmailInput, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateProfile, runLogOut } from '../../services/actions/all-actions'
import { getCookie, setCookie } from '../../utils/cookie'

const ProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  const { getUserSuccess, authData } = useSelector(store =>  ({getUserSuccess: store.rootAuth.getUserSuccess, authData: store.rootAuth.authData}));
  const logoutSuccess = useSelector(store =>  (store.rootAuth.postLogoutSuccess));
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
    dispatch(updateProfile(nameUser, emailUser, password))
  }
  const cancelSave = e => {
    e.preventDefault();
    setName(authData.name);
    setEmail(authData.email);
    setPassword('');
  }
  const onChangeName  = e => {
    setName(e.target.value);
  }
  const onChangeEmail  = e => {
    setEmail(e.target.value);
  }
  const onChangePass  = e => {
    setPassword(e.target.value);
  }
  const logOut = () => {
    const refreshToken = getCookie('refreshToken');
    console.log('выходим '+ refreshToken);
    dispatch(runLogOut(refreshToken));
  }
  if (logoutSuccess) {
    console.log("ВЫШЛИ ИЗ ПРИЛОЖЕНИЯ");
  }

  return (
    <div className={styles.container}>
      <ul className={`${styles.list}`}>
        <li className={`${styles.el}`}>
          <NavLink className={styles.link} activeClassName={styles.aLink} exact to='profile'>Профиль</NavLink>
        </li>
        <li className={`${styles.el}`}>
          <NavLink className={styles.link} activeClassName={styles.aLink} exact to='/profile/orders'>История заказов</NavLink>
        </li>
        <li className={`${styles.el}`}>
          <NavLink className={styles.link} activeClassName={styles.aLink} exact to='/login' onClick={logOut}>Выход</NavLink>
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
            onChange={onChangeName}
          />
          <EmailInput
            placeholder={'Логин'}
            name={'email'}
            type={'email'}
            size={'default'}
            error={false}
            errorText={'error'}
            value={`${emailUser}`}
            onChange={onChangeEmail}
          />
          <PasswordInput
            placeholder={'Пароль'}
            name={'password'}
            size={'default'}
            error={false}
            errorText={'error'}
            type={'password'}
            value={password}
            onChange={onChangePass}
          />
          <div className={styles.save}>
            <Button type="secondary" size="medium" onClick={cancelSave}>Отмена</Button>
            <Button type="primary" size="medium"  disabled={!nameUser && !emailUser && !password}>Сохранить</Button>
          </div>
      </form>

    </div>
  );
};

export default ProfilePage;
