import styles from './user-orders-page.module.css';
import { Link, Redirect, NavLink, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateProfile, runLogOut } from '../../services/actions/auth-actions'
import { getCookie, setCookie } from '../../utils/cookie'
import FeedCardComponent from '../../components/feed-card-component/feed-card-component'

const UserOrdersPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  function logOut() {
    const refreshToken = getCookie('refreshToken');
    console.log('выходим '+ refreshToken);
    dispatch(runLogOut(refreshToken));
    history.push('/login');
  }
  return (
    <div className={styles.container}>
      <ul className={`${styles.list}`}>
        <li className={`${styles.el}`}>
          <NavLink className={styles.link} activeClassName={styles.aLink} exact to='/profile'>Профиль</NavLink>
        </li>
        <li className={`${styles.el}`}>
          <NavLink className={styles.link} activeClassName={styles.aLink} exact to='/profile/orders'>История заказов</NavLink>
        </li>
        <li className={`${styles.el}`}>
          <NavLink className={styles.link} activeClassName={styles.aLink} exact to='/login' onClick={logOut}>Выход</NavLink>
        </li>
      </ul>

      <div className={styles.feed}>
          <FeedCardComponent />
          <FeedCardComponent />
          <FeedCardComponent />
          <FeedCardComponent />
          <FeedCardComponent />
          <FeedCardComponent />
          <FeedCardComponent />
          <FeedCardComponent />
          <FeedCardComponent />
      </div>

    </div>
  );
};

export default UserOrdersPage;
