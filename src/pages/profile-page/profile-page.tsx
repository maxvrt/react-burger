import styles from './profile-page.module.css';
import { Button, EmailInput, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, NavLink, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../types/types';
import { getUserProfile, updateProfile, runLogOut } from '../../services/actions/auth-actions'
import { getCookie, setCookie } from '../../utils/cookie'

const ProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile())
  }, [])

  const { getUserSuccess, authData } = useSelector(store =>  ({getUserSuccess: store.rootAuth.getUserSuccess, authData: store.rootAuth.authData}));
  const logoutSuccess = useSelector(store =>  (store.rootAuth.postLogoutSuccess));
  const [nameUser, setName] = useState('111')
  const [emailUser, setEmail] = useState('111')
  const [password, setPassword] = useState('')
  const history = useHistory();
  useEffect(() => {
    if (authData.name) setName(authData.name);
    if (authData.email) setEmail(authData.email);
  }, [authData.name]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProfile(nameUser, emailUser, password))
  }
  const cancelSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (authData.name) setName(authData.name);
    if (authData.email) setEmail(authData.email);
    setPassword('');
  }
  const onChangeName  = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }
  const onChangeEmail  = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const onChangePass  = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  function logOut() {
    const refreshToken = getCookie('refreshToken');
    console.log('выходим '+ refreshToken);
    if (refreshToken) dispatch(runLogOut(refreshToken));
    history.push('/login');
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
            name={'email'}
            size={'default'}
            value={`${emailUser}`}
            onChange={onChangeEmail}
          />
          <PasswordInput
            name={'password'}
            size={'default'}
            value={password}
            onChange={onChangePass}
          />
          <div className={styles.save}>
            <Button type="secondary" size="medium" onClick={cancelSave}>Отмена</Button>
            <Button type="primary" size="medium" disabled={!nameUser && !emailUser && !password}>Сохранить</Button>
          </div>
      </form>

    </div>
  );
};

export default ProfilePage;
