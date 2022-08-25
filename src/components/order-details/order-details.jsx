import React, { useEffect,useRef } from 'react';
import orderDetails from './order-details.module.css';
import doneImg from "../../images/done.png";
import { useSelector } from 'react-redux';

export default function OrderDetails() {
  const data = useSelector(store =>  (store.rootIngredients.orderData));
  return (
    <div className={orderDetails.container}>
      <h2 className={orderDetails.digits}>{data.order.number}</h2>
      <p className={orderDetails.name}>идентификатор заказа</p>
      <img src={doneImg} alt="Заказ оформлен" className={orderDetails.img}/>
      <p className={orderDetails.cooking}>Ваш заказ начали готовить</p>
      <p className={orderDetails.waiting}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
