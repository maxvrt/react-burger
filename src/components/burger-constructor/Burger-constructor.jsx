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
import { useDrop, useDrag } from "react-dnd";
import {SET_BUN, ADD_INGREDIENT}  from '../../services/actions/all-actions';
import { useInView } from 'react-intersection-observer';

export default function BurgerConstructor() {
  const oneBun = useSelector(store =>  (store.rootIngredients.bun));
  const arrNoBunOrder = useSelector(store =>  (store.rootIngredients.selectedIngredients));
  const dispatch = useDispatch();

  const Inner = ({item, index}) => {
    const ref = useRef(null);
    const itemId = item.id;

    const deleteItem = (id) => {
      dispatch({
        type: 'DELETE_ITEM',
        payload: id,
      });
    };

    const [, drop] = useDrop({
      accept: 'el',
      hover(item) {
        if (!ref.current) {
          return;
        }
        const itemIndex = item.index;
        const selectedIndex = index;
        console.log(selectedIndex + '.  itemIndex: ' + itemIndex);
        dispatch({
          type: 'MOVE_ELEMENT',
          payload: { itemIndex, selectedIndex },
        });
        item.index = selectedIndex;
      },
    });
    const [, drag] = useDrag({
      type: 'el',
      item: { itemId, index },
    });
    drag(drop(ref));

    return (
      <div className={burgerConstructor.scrollElement} ref={ref}>
        <DragIcon/>
        <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => deleteItem(itemId)}
        />
      </div>
    );
  };

  let arrIds = [];
  let totalPrice = 0;
  if (arrNoBunOrder.length > 0 || JSON.stringify(oneBun) !== '{}'){
    arrIds = arrNoBunOrder.map(item=> item._id);
    totalPrice = arrNoBunOrder.reduce(function (sum, item) {return sum + item.price},0);
    if(oneBun.price>0) totalPrice = totalPrice + oneBun?.price*2;
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
      console.log(item);
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
              <Inner item={item} index={index} key={`${item.id}_${index}`}/>
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
