import React, { useEffect,useRef } from 'react';
import orderDetails from './order-details.module.css';
import { CloseIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import doneImg from "../../images/done.png";


export default function OrderDetails() {

  return (
    <div className={orderDetails.container}>
      <h2 className={orderDetails.digits}>034536</h2>
      <p className={orderDetails.name}>идентификатор заказа</p>
      <img src={doneImg} alt="Заказ оформлен" className={orderDetails.img}/>
      <p className={orderDetails.cooking}>Ваш заказ начали готовить</p>
      <p className={orderDetails.waiting}>Дождитесь готовности на орбитальной станции</p>
    </div>
)
}
