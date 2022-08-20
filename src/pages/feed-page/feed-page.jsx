import styles from './feed-page.module.css';
import FeedCardComponent from '../../components/feed-card-component/feed-card-component'
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie'
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE } from '../../services/actions/websocket-actions'
  import { useEffect } from 'react'
  import { useMemo } from 'react'

const FeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: WS_CONNECTION_START});
  }, [dispatch]);

  const { data  } = useSelector(store => ({
    data: store.rootWs.data
  }));
  const dataOrders = data.orders;
  const total = data.total;
  const totalToday = data.totalToday;
  if (data.orders) {
      console.log(data);
  }
  const ordersDone = useMemo(() => {
    if (dataOrders) {
       return dataOrders.filter(item => item.status === 'done').slice(0,26)
    }
  }, [dataOrders])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Лента заказов</h1>
      <div className={styles.feedWrap}>
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
        <div className={styles.statistics}>
          <div className={styles.columns}>
            <ul className={styles.columnsWrap}>
              <li className={styles.resultsTitleTop}>Готовы:</li>
            { ordersDone && ordersDone.map(item => (
                <li className={styles.columnsDigitsLeft} key={item.number}>{item.number}</li>
              ))
            }
            </ul>
            <ul className={styles.columnsWrap}>
              <li className={styles.resultsTitleTop}>В работе:</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
              <li className={styles.columnsDigitsRight}>11111111</li>
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
