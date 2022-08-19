import styles from './order-component.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

//{ number, date, name, ingredients, status = '' }
const OrderComponent = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Black Hole Burger острый Black Hole</h1>
      <p className={styles.status}>выполнен</p>
      <p className={styles.compound}>Состав:</p>
      <ul className={styles.scroll}>
        <li className={styles.element}>
          <img className={styles.img} src="https://avatanplus.com/files/resources/mid/5b7c152b062e01655cb2b011.png" alt="булка" />
          <p className={styles.desc}>Флуоресцентная булка R2-D3</p>
          <p className={styles.priceDigit}>2x20</p>
          <div className={styles.icon}>
            <CurrencyIcon type="primary"/>
          </div>
        </li>
        <li className={styles.element}>
          <img className={styles.img} src="https://avatanplus.com/files/resources/mid/5b7c152b062e01655cb2b011.png" alt="булка" />
          <p className={styles.desc}>Флуоресцентная булка R2-D3</p>
          <p className={styles.priceDigit}>2x20</p>
          <div className={styles.icon}>
            <CurrencyIcon type="primary"/>
          </div>
        </li>        <li className={styles.element}>
          <img className={styles.img} src="https://avatanplus.com/files/resources/mid/5b7c152b062e01655cb2b011.png" alt="булка" />
          <p className={styles.desc}>Флуоресцентная булка R2-D3</p>
          <p className={styles.priceDigit}>2x20</p>
          <div className={styles.icon}>
            <CurrencyIcon type="primary"/>
          </div>
        </li>
        <li className={styles.element}>
          <img className={styles.img} src="https://avatanplus.com/files/resources/mid/5b7c152b062e01655cb2b011.png" alt="булка" />
          <p className={styles.desc}>Флуоресцентная булка R2-D3</p>
          <p className={styles.priceDigit}>2x20</p>
          <div className={styles.icon}>
            <CurrencyIcon type="primary"/>
          </div>
        </li>
        <li className={styles.element}>
          <img className={styles.img} src="https://avatanplus.com/files/resources/mid/5b7c152b062e01655cb2b011.png" alt="булка" />
          <p className={styles.desc}>Флуоресцентная булка R2-D3</p>
          <p className={styles.priceDigit}>2x20</p>
          <div className={styles.icon}>
            <CurrencyIcon type="primary"/>
          </div>
        </li>
        <li className={styles.element}>
          <img className={styles.img} src="https://avatanplus.com/files/resources/mid/5b7c152b062e01655cb2b011.png" alt="булка" />
          <p className={styles.desc}>Флуоресцентная булка R2-D3</p>
          <p className={styles.priceDigit}>2x20</p>
          <div className={styles.icon}>
            <CurrencyIcon type="primary"/>
          </div>
        </li>
      </ul>
      <div className={styles.footer}>
        <p className={styles.data}>Вчера 13:50 1-GMT</p>
        <div className={styles.price}>
          <p className={styles.priceDigit}>510</p>
          <div className={styles.icon}>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
