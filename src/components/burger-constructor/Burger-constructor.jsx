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
import { useSelector, useDispatch } from 'react-redux';
import {addOrder} from '../../services/reducers/reducers'
import { useDrop } from "react-dnd";
import {SET_BUN, ADD_INGREDIENT}  from '../../services/actions/all-actions';

export default function BurgerConstructor() {
  const oneBun = useSelector(store =>  (store.ingredients.bun));
  //const array = useSelector(store =>  (store.ingredients.ingredients));
  const arrNoBunOrder = useSelector(store =>  (store.ingredients.selectedIngredients));
  const dispatch = useDispatch();

  const Inner = ({item, index}) => {

    return (
      <div className={burgerConstructor.scrollElement} key={index}>
        <DragIcon/>
        <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        />
      </div>
    );
  };

  let arrIds = [];
  let totalPrice = 0;
  if (arrNoBunOrder.length > 0){
    arrIds = arrNoBunOrder.map(item=> item._id);
    totalPrice = arrNoBunOrder.reduce(function (sum, item) {return sum + item.price},0);
    totalPrice = totalPrice + oneBun?.price*2;
  };
  const onClickOrder = () => {
    dispatch(addOrder(arrIds));
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
          payload: { ...item.item, id: idItem },
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
        {arrNoBunOrder.length > 0 ? (
          <div className={burgerConstructor.scrollBlock}>
            {arrNoBunOrder.map((item, index)=>(
              <Inner item={item} index={index} />
            ))}
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
          <Button onClick={onClickOrder} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
  )
};

BurgerConstructor.propTypes = {
  //oneBun: PropTypes.object.isRequired
};
