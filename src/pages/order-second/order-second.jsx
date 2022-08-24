import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import OrderComponent from '../../components/order-component/order-component';
import styles from './order-second.module.css'
import { WS_CONNECTION_START, WS_AUTH_CONNECTION_START, WS_CONNECTION_CLOSED, WS_AUTH_CONNECTION_CLOSED } from '../../services/actions/websocket-actions';


const OrderSecond = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: WS_CONNECTION_START});
    dispatch({type: WS_AUTH_CONNECTION_START});
   }, [dispatch]);

  return (
    <div className={styles.container}>
        <OrderComponent/>
    </div>
  )
}

export default OrderSecond
