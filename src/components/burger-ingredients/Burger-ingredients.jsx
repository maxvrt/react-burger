import React, { useEffect,useRef } from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import { Counter, Tab, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types'
export default function BurgerIngredients({array, onClickDesc}) {
  const [current, setCurrent] = React.useState('one');

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  let init = false;
  const Card = ({item}) => {
    const handleClick = ()=> onClickDesc(item);
    return (
      <li className={burgerIngredients.cardItem} onClick={handleClick}>
        <img className={burgerIngredients.cardImg} src={item.image} />
        <div className={burgerIngredients.cardPrice}><p className={burgerIngredients.cardPriceDig}>{item.price}</p><CurrencyIcon/></div>
        <p className={burgerIngredients.cardName}>{item.name}</p>
        <Counter/>
      </li>
    );
  };
  // первая загрузка страницы
  useEffect(() => {
    init = true;
  }, [])
  // обработка скрола при изменении состояния current
  useEffect(() => {
    if (current==='one' && !init){
      bunRef.current.scrollIntoView({block: "start", behavior: "smooth"});
    } else if (current==='two') {
      sauceRef.current.scrollIntoView({block: "start", behavior: "smooth"});
    } else if (current==='three'){
      mainRef.current.scrollIntoView({block: "start", behavior: "smooth"});
    }
    console.log(`Состояние current: ${current}`);
  }, [current])


  return (
      <section className={burgerIngredients.container}>
        <h1 className={burgerIngredients.title}>Соберите бургер</h1>
        <ul className={burgerIngredients.tabs}>
          <li className={burgerIngredients.tab}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
              Булки
            </Tab>
          </li>
          <li className={burgerIngredients.tab}>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
          </li>
          <li className={burgerIngredients.tab}>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
          </li>
        </ul>
        <div className={burgerIngredients.scrollBlock}>
          <h2 ref={bunRef} className={burgerIngredients.listTitle}>Булки</h2>
          <ul className={burgerIngredients.list}>
            {array.filter((item) => item.type === "bun").map((item, index)=>(
                <Card item={item} key={item._id}/>
            ))}
          </ul>
          <h2 ref={sauceRef} className={burgerIngredients.listTitle}>Соусы</h2>
          <ul className={burgerIngredients.list}>
            {array.filter((item) => item.type === "sauce").map((item, index)=>(
              <Card item={item} key={item._id}/>
            ))}
          </ul>
          <h2 ref={mainRef} className={burgerIngredients.listTitle}>Начинки</h2>
          <ul className={burgerIngredients.list}>
            {array.filter((item) => item.type === "main").map((item, index)=>(
              <Card item={item} key={item._id}/>
            ))}
          </ul>
        </div>
      </section>
  )
};
BurgerIngredients.propTypes = {
  array: PropTypes.arrayOf(ingredientPropType).isRequired
};
