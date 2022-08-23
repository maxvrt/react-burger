import styles from './user-orders-page.module.css';
import { useLocation, useRouteMatch, NavLink, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { runLogOut } from '../../services/actions/auth-actions';
import { getCookie, setCookie } from '../../utils/cookie';
import { useEffect } from 'react';
import FeedCardComponent from '../../components/feed-card-component/feed-card-component'
import { WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_CLOSED } from '../../services/actions/websocket-actions';

const UserOrdersPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: WS_AUTH_CONNECTION_START});
  }, [dispatch]);

  const { data, wsConnected  } = useSelector(store => ({
    data: store.rootWsAuth.userData,
    wsConnected: store.rootWsAuth.wsUserConnected
  }));

  let dataOrders;
  if (data) {
   dataOrders = data.orders;
   console.log(dataOrders);
  }
 const location = useLocation();


 const history = useHistory();
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
        { dataOrders && dataOrders.map((item) => (
            <Link key={item._id} className={styles.linkComponent}
              to={{
                  pathname: `/profile/orders/${item._id}`,
                  state: { background: location }
              }}>
                  <FeedCardComponent
                  name={item.name}
                  number={item.number}
                  ingredientIds={item.ingredients}
                  date={item.createdAt}
                  status={item.status} />
            </Link>
          ))
        }
      </div>

    </div>
  );
};

export default UserOrdersPage;
