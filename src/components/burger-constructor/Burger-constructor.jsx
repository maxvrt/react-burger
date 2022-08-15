import React, { useEffect,useRef, useMemo, useState } from 'react';
import burgerConstructor from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, LockIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux';
import { addOrder, SET_BUN, ADD_INGREDIENT, DELETE_ITEM, MOVE_ELEMENT } from '../../services/actions/burger-actions'
import { useDrop, useDrag } from "react-dnd";
import { useInView } from 'react-intersection-observer';
import { useHistory, Redirect, Route } from "react-router-dom";
import BurgerConstructorElement from '../burger-constructor-element/Burger-constructor-element';
export default function BurgerConstructor() {
  const oneBun = useSelector(store =>  (store.rootIngredients.bun));
  const arrNoBunOrder = useSelector(store =>  (store.rootIngredients.selectedIngredients));
  const dispatch = useDispatch();
  const user = useSelector(store =>  (store.rootAuth.authData.name));
  const checkAuth = useSelector(store =>  (store.rootAuth.isAuthChecked));
  const history = useHistory();
  let arrIds = [];
  let totalPrice = 0;
  if (arrNoBunOrder.length > 0 || JSON.stringify(oneBun) !== '{}'){
    arrIds = arrNoBunOrder.map(item=> item._id);
    totalPrice = arrNoBunOrder.reduce(function (sum, item) {return sum + item.price},0);
    if(oneBun.price>0) totalPrice = totalPrice + oneBun?.price*2;
  };
  const onClickOrder = () => {
    if (checkAuth) {
      console.log('оформление заказа началось');
      dispatch(addOrder(arrIds));
    } else {
      console.log('Редирект на логин');
      history.push("/login");
    }
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item) {
      if (item.item.type === 'bun') {
        dispatch({
          type: SET_BUN,
          payload: item.item,
        });
      } else {
        const idItem = Math.random().toString(36).slice(2);
        dispatch({
          type: ADD_INGREDIENT,
          payload: { ...item.item, uuid:idItem },
        });
      }
    },
  });

  return (
      <section className={burgerConstructor.container} ref={dropTarget}>
        {JSON.stringify(oneBun) !== '{}' ? (
          <div className={burgerConstructor.singleEl}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={oneBun?.name + ' (верх)'}
              price={oneBun?.price}
              thumbnail={oneBun?.image_mobile}
            />
          </div>
        ) : (
          <div className={burgerConstructor.emptyTop}>Булка</div>
        )}
        {arrNoBunOrder.length  ? (
          <div className={burgerConstructor.scrollBlock}>
            {
              arrNoBunOrder.map((item, index)=>{
                //return <Inner item={item} index={index} key={`${item.uuid}`}/>
                return <BurgerConstructorElement item={item} index={index} key={`${item.uuid}`}/>
              })
            }
          </div>
        ) : (
            <div className={burgerConstructor.empty}>Ингредиенты</div>
        )}
        {JSON.stringify(oneBun) !== '{}' ? (
          <div className={burgerConstructor.singleEl}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={oneBun?.name + ' (низ)'}
              price={oneBun?.price}
              thumbnail={oneBun?.image_mobile}
            />
          </div>
        ) : (
          <div className={burgerConstructor.emptyBottom}>Булка</div>
        )}
        <div className={burgerConstructor.totalPrice}>
          <div className={burgerConstructor.priceEl}>
            <p className="text text_type_digits-medium">{totalPrice}</p>
            <CurrencyIcon type="primary"/>
          </div>
          {arrNoBunOrder.length === 0 ? <div className={burgerConstructor.disableOrder}>Оформить заказ</div> :
          <Button onClick={onClickOrder} type="primary" size="large">
            Оформить заказ
          </Button>
          }
        </div>
      </section>
  )
};

BurgerConstructor.propTypes = {
  //oneBun: PropTypes.object.isRequired
};
