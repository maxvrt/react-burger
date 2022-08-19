import styles from './order-page.module.css';
import OrderComponent from "../../components/order-component/order-component";

//{ number, date, name, ingredients, status = '' }
const OrderPage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.number}>#52346</p>
      <OrderComponent/>
    </div>
  );
};
export default OrderPage;
