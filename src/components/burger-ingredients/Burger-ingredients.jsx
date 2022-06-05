import React, { useEffect } from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import { Counter, Tab, Box, Typography,  } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerIngredients(props) {
  const [state, setState] = React.useState(props.array);
  useEffect(() => {})
  // state = {
  //   ingredients:array
  // }
  const arr = props.array;

  return (
    <>
    {console.log(props)}
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
          <Tab value="two">
              Начинки
          </Tab>
        </li>
      </ul>
        {arr.map((item, index)=>(
            <div className="Message" key={item._id}>
                <span className="Message-user">{item.name}</span>
                <span className="Message-text">{item.proteins}</span>
            </div>
        ))}
      </div>
    </>
  )
};
