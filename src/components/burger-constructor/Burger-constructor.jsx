import React, { useEffect,useRef } from 'react';
import burgerConstructor from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, LockIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerConstructor(props) {
  const [state, setState] = React.useState(props.array);

  return (
      <section className={burgerConstructor.container}>
         <div className={burgerConstructor.singleEl}>
            {state.filter((item) => item.type === "bun").slice(0, 1).map((item, index)=>(
              <ConstructorElement key={index}
                type="top"
                isLocked={true}
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
              />
            ))}
         </div>
         <div className={burgerConstructor.scrollBlock}>
         {state.filter((item) => item.type === "main").slice(0, 6).map((item, index)=>(
            <div className={burgerConstructor.scrollElement}>
              <DragIcon/>
              <ConstructorElement
               text={item.name}
               price={item.price}
               thumbnail={item.image_mobile}
              />
            </div>
          ))}
         </div>
         <div className={burgerConstructor.singleEl}>
            {state.filter((item) => item.type === "bun").slice(1, 2).map((item, index)=>(
              <ConstructorElement key={index}
                type="bottom"
                isLocked={true}
                text={item.name}
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
