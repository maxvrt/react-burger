import React, { useEffect,useRef, useMemo, useState } from 'react';
import burgerConstructor from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, LockIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types'
import BurgerIngredientsContext from "../../context/burger-ingredients-context";
import OrderDetailsContext from "../../context/order-details-context";
import ModalDataContext from "../../context/modal-data-context";
import { useContext } from "react";
import {postOrder, getResponse, catchError} from '../../utils/api';

export default function BurgerConstructor({oneBun}) { //, onClickOrder
  const array = useContext(BurgerIngredientsContext);
  const setIsOrderDetails = useContext(OrderDetailsContext);
  const setModalData = useContext(ModalDataContext);
  const arrNoBunOrder = array.filter((item) => item.type !== "bun").slice(0, 6);
  const arrIds = arrNoBunOrder.map(item=> item._id);
  let totalPrice = arrNoBunOrder.reduce(function (previousValue, item) {return previousValue + item.price},0);
  totalPrice = totalPrice + oneBun.price*2;
  //console.log(totalPrice);

  const onClickOrder = () => {
    postOrder(arrIds) // сохраняем ингредиенты на сервер
    .then(res => getResponse(res))
    .then(data => {
        setModalData(data); // полученный ответ помещаем в стейт для модалки
        // в ответе номер заказа лежит в data.order.number
        setIsOrderDetails(true);
      }).catch(err => catchError(err));;
  };

  return (
      <section className={burgerConstructor.container}>
         <div className={burgerConstructor.singleEl}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={oneBun.name + ' (верх)'}
                price={oneBun.price}
                thumbnail={oneBun.image_mobile}
              />
         </div>
         <div className={burgerConstructor.scrollBlock}>
         {arrNoBunOrder.map((item, index)=>(
            <div className={burgerConstructor.scrollElement} key={index}>
              <DragIcon/>
              <ConstructorElement
               isLocked={false}
               text={item.name}
               price={item.price}
               thumbnail={item.image_mobile}
              />
            </div>
          ))}
         </div>
         <div className={burgerConstructor.singleEl}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={oneBun.name + ' (низ)'}
                price={oneBun.price}
                thumbnail={oneBun.image_mobile}
              />
         </div>
        <div className={burgerConstructor.totalPrice}>
          <div className={burgerConstructor.priceEl}>
            <p className="text text_type_digits-medium">{totalPrice}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <Button onClick={onClickOrder} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
  )
};

BurgerConstructor.propTypes = {
  oneBun: PropTypes.object.isRequired
};
