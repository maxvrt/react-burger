import styles from './feed-card-component.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

//{ number, date, name, ingredients, status = '' }
export default function FeedCardComponent() {

  return (
    <div className={styles.container}>
      <div className={styles.topLeft}>#52346</div>
      <div className={styles.topRight}>Сегодня, 16:20 i-GMT</div>
      <div className={styles.mid}>
        <p className={styles.midTitle}>Death StarShip Main бургер</p>
        <p className={styles.midStatus}>Создан</p>
      </div>
      <div className={styles.bottomLeft}>картинки картинки</div>
      <div className={styles.bottomRight}>
        <p className={styles.price}>460</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

