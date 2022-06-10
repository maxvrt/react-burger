import React, { useEffect,useRef, useMemo, useState } from 'react';
import burgerConstructor from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, LockIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types'

export default function BurgerConstructor({array, oneBun, onClickOrder}) {

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
         {array.filter((item) => item.type !== "bun").slice(0, 6).map((item, index)=>(
            <div className={burgerConstructor.scrollElement}  key={index}>
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
            <p className="text text_type_digits-medium">610</p>
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
  array: PropTypes.arrayOf(ingredientPropType).isRequired
};
