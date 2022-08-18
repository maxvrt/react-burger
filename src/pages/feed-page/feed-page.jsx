import styles from './feed-page.module.css';
import FeedCardComponent from '../../components/feed-card-component/feed-card-component'
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie'

//{ number, date, name, ingredients, status = '' }
const FeedPage = () => {
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
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
              <li className={styles.columnsDigitsLeft}>11111111</li>
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
              <p className={styles.resultsDigits}>2804</p>
            </div>
            <div className={styles.resultsInner}>
              <p className={styles.resultsTitle}>Выполнено за сегодня:</p>
              <p className={styles.resultsDigits}>121</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
