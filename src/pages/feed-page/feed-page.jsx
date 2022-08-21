import styles from './feed-page.module.css';
import FeedCardComponent from '../../components/feed-card-component/feed-card-component'
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { Link, useLocation, useRouteMatch } from 'react-router-dom'
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE } from '../../services/actions/websocket-actions'
  import { useEffect } from 'react';

const FeedPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch({type: WS_CONNECTION_START});
  }, [dispatch]);
  const { data  } = useSelector(store => ({
    data: store.rootWs.data
  }));
  let dataOrders = data.orders;
  const total = data.total;
  const totalToday = data.totalToday;
  let unDone = [];

  if (dataOrders) {
    console.log(dataOrders);
    unDone = dataOrders.filter(item => item.status !== 'done').slice(0,26);
    dataOrders = dataOrders.filter(item => item.status === 'done').slice(0,26);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Лента заказов</h1>
      <div className={styles.feedWrap}>
        <div className={styles.feed}>
        { dataOrders && dataOrders.map((item) => (
            <Link key={item._id}
            className={styles.link}
              to={{
                  pathname: `/feed/${item._id}`,
                  state: { background: location }
              }}>
                  <FeedCardComponent
                  name={item.name}
                  number={item.number}
                  ingredientIds={item.ingredients}
                  date={item.createdAt} />
            </Link>
          ))
        }
        </div>
        <div className={styles.statistics}>
          <div className={styles.columns}>
            <ul className={styles.columnsWrap}>
              <li className={styles.resultsTitleTop}>Готовы:</li>
            { dataOrders && dataOrders.map(item => (
                <li className={styles.columnsDigitsLeft} key={item._id}>{item.number}</li>
              ))
            }
            </ul>
            <ul className={styles.columnsWrap}>
              <li className={styles.resultsTitleTop}>В работе:</li>
              { unDone && unDone.map(item => (
                <li className={styles.columnsDigitsRight} key={item._id}>{item.number}</li>
              ))
            }
            </ul>
          </div>
          <div className={styles.results}>
            <div className={styles.resultsInner}>
              <p className={styles.resultsTitle}>Выполнено за всё время:</p>
              <p className={styles.resultsDigits}>{total}</p>
            </div>
            <div className={styles.resultsInner}>
              <p className={styles.resultsTitle}>Выполнено за сегодня:</p>
              <p className={styles.resultsDigits}>{totalToday}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;