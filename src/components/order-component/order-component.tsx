import styles from './order-component.module.css';
import { useDispatch, useSelector } from '../../types/types';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Route, useParams, useRouteMatch  } from 'react-router-dom';
import Spinner from '../spinner/spinner'
import type { TOrder, TIngItem, TIngParam } from '../../types/types';
import React, { FC } from 'react';

const OrderComponent = () => {
  const {id} = useParams<TIngParam>();
  const idNum = Number(id);
  const { userData, data, ingredients } = useSelector(store => ({
    userData: store.rootWsAuth.userData,
    data: store.rootWs.data,
    ingredients: store.rootIngredients.ingredients,
  }));

  const match = useRouteMatch()
  const isUser = match.path === '/profile/orders/:id';
  let newData = isUser ? userData : data;
  let oneOrder:TOrder|undefined;
  let date:string = '';
  let countOrderIds:number[] = [];
  let newIngredients:Array<TIngItem|undefined> = [];
  let price = 0 ;
  if (newData.orders && Object.keys(newData.orders).length > 0) {
    console.log('заказы:');
    console.log(newData.orders);
    oneOrder = newData.orders.find((order:TOrder) => order.number === idNum);
    if (oneOrder!==undefined) {
      date = new Date(oneOrder.createdAt).toISOString().slice(0, 16);
      // уникальные ингредиенты и их кол-во
      let elem:any;
      for (elem of oneOrder.ingredients) {
        if (!countOrderIds[elem]) {
          countOrderIds[elem] = 1;
        } else {
          countOrderIds[elem]++;
        }
      };
    }

    newIngredients = Object.keys(countOrderIds).map(id => {
      return ingredients.find(function (ingredient) {
        if (ingredient._id === id && ingredient.price)  price = price + ingredient.price*countOrderIds[Number(ingredient._id)];
        return ingredient._id === id;
      });
    });

  }

  return (
    ingredients && oneOrder && (
      <div className={styles.container}>
         <p className={styles.number}>#{oneOrder.number}</p>
        <h1 className={styles.title}>{oneOrder.name}</h1>
        <p className={styles.status}>
           {oneOrder?.status === 'done' ? 'Выполнен' :
            oneOrder?.status === 'pending' ? 'Готовится' :
            oneOrder?.status === 'created' ? 'Создан' : ''}
        </p>
        <p className={styles.compound}>Состав:</p>
        <ul className={styles.scroll}>
        {
          newIngredients.map((item, index) => {
            return (
            <li className={styles.element} key={index}>
              <img className={styles.img} src={item?.image_mobile} alt={item?.name} />
              <p className={styles.desc}>{item?.name}</p>
              <p className={styles.priceDigit}>{countOrderIds[item?._id]} x {item?.price}</p>
              <div className={styles.icon}>
                <CurrencyIcon type="primary"/>
              </div>
            </li>
            )
          })
        }
        </ul>
        <div className={styles.footer}>
          <p className={styles.data}>{date}</p>
          <div className={styles.price}>
            <p className={styles.priceDigit}>{price}</p>
            <div className={styles.icon}>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>
      </div>
      ) ||
      <Spinner/>
  );
};

export default OrderComponent;
