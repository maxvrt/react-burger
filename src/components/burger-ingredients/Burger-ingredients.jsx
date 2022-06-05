import React, { useEffect } from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import { Counter, Tab, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerIngredients(props) {
  const [state, setState] = React.useState(props.array);
  //useEffect(() => {})
  //const arr = props.array;

  const Card = (props) => {
    return (
      <li className={burgerIngredients.cardItem}>
        <img className={burgerIngredients.cardImg} src={props.item.image} />
        <div className={burgerIngredients.cardPrice}><p className={burgerIngredients.cardPriceDig}>{props.item.price}</p><CurrencyIcon/></div>
        <p className={burgerIngredients.cardName}>{props.item.name}</p>
      </li>
    );
  };

  return (
    <>
      <div className={burgerIngredients.container}>
        <h1 className={burgerIngredients.title}>Соберите бургер</h1>
        <ul className={burgerIngredients.tabs}>
          <li className={burgerIngredients.tab}>
            <Tab value="one">
              Булки
            </Tab>
          </li>
          <li className={burgerIngredients.tab}>
            <Tab value="two">
                Соусы
            </Tab>
          </li>
          <li className={burgerIngredients.tab}>
            <Tab value="three">
                Начинки
            </Tab>
          </li>
        </ul>
        <div className={burgerIngredients.scrollBlock}>
          <h2 className={burgerIngredients.listTitle}>Булки</h2>
          <ul className={burgerIngredients.list}>
            {state.filter((item) => item.type === "sauce").map((item, index)=>(
                <Card item={item} key={index}/>
            ))}
          </ul>
          <h2 className={burgerIngredients.listTitle}>Соусы</h2>
          <ul className={burgerIngredients.list}>
            {state.filter((item) => item.type === "sauce").map((item, index)=>(
              <Card item={item} key={index}/>
            ))}
          </ul>
          <h2 className={burgerIngredients.listTitle}>Начинки</h2>
          <ul className={burgerIngredients.list}>
            {state.filter((item) => item.type === "main").map((item, index)=>(
              <Card item={item} key={index}/>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
};
