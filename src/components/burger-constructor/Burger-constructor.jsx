import React, { useEffect,useRef } from 'react';
import burgerConstructor from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, LockIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types'

export default function BurgerConstructor({array}) {
  return (
      <section className={burgerConstructor.container}>
         <div className={burgerConstructor.singleEl}>
            {array.filter((item) => item.type === "bun").slice(0, 1).map((item, index)=>(
              <ConstructorElement key={item._id}
                type="top"
                isLocked={true}
                text={item.name + ' (верх)'}
                price={item.price}
                thumbnail={item.image_mobile}
              />
            ))}
         </div>
         <div className={burgerConstructor.scrollBlock}>
         {array.filter((item) => item.type === "main").slice(0, 6).map((item, index)=>(
            <div className={burgerConstructor.scrollElement}  key={item._id}>
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
            {array.filter((item) => item.type === "bun").slice(0, 1).map((item, index)=>(
              <ConstructorElement key={item._id}
                type="bottom"
                isLocked={true}
                text={item.name + ' (низ)'}
                price={item.price}
                thumbnail={item.image_mobile}
              />
            ))}
         </div>
        <div className={burgerConstructor.totalPrice}>
          <div className={burgerConstructor.priceEl}>
            <p className="text text_type_digits-medium">610</p>
            <CurrencyIcon type="primary"/>
          </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
  )
};

BurgerConstructor.PropType = {
  array: PropTypes.arrayOf(ingredientPropType).isRequired
};
