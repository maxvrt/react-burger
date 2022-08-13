import { useEffect, useRef, useState, useMemo } from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import { Counter, Tab, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { useInView } from 'react-hook-inview';
import { Link, useLocation } from 'react-router-dom';
//{onClickDesc}
export default function BurgerIngredients({onClickDesc}) {
  const [current, setCurrent] = useState('bun');
  const array = useSelector(store =>  (store.rootIngredients.ingredients));

  const [bunRef, inViewBun] = useInView();
  const [sauceRef, inViewSauce] = useInView();
  const [mainRef, inViewMain] = useInView();

  // Элемент в списке ингредиентов
  const Card = ({item}) => {
    const location = useLocation()
    const handleClick = ()=> onClickDesc(item);
    const [, dragRef] = useDrag({
      type: 'ingredients',
      item: { item }
    });
    const {selectedIngredients, bun} = useSelector((store) => store.rootIngredients);
    const count = useMemo(
      () =>(count = 0) => {
         if(selectedIngredients) selectedIngredients.forEach((element)=>{ if (element._id === item._id) count++; });
         if (bun && bun._id === item._id) count = 2;
         return count;
        },
      [selectedIngredients, bun]
    );
    //onClick={handleClick}
    return (
      <Link className={burgerIngredients.link} to={{ pathname: `/ingredient/${item._id}`, state: { background: location } }} >
      <li className={burgerIngredients.cardItem} onClick={handleClick} ref={dragRef}>
        <img className={burgerIngredients.cardImg} src={item.image} />
        <div className={burgerIngredients.cardPrice}><p className={burgerIngredients.cardPriceDig}>{item.price}</p><CurrencyIcon/></div>
        <p className={burgerIngredients.cardName}>{item.name}</p>
        <Counter count={count()} />
      </li>
      </Link>
    );
  };

  // обработка скрола через плагин
  useEffect(() => {
    if (inViewBun) {
      setCurrent('bun');
    } else if (inViewSauce) {
      setCurrent('sauce');
    } else if (inViewMain) {
      setCurrent('main');
    }
  }, [inViewBun, inViewSauce, inViewMain]);

  const clickCategory = (tabElement) => {
    setCurrent(tabElement);
    const category = document.getElementById(tabElement);
    category.scrollIntoView({block: 'start', behavior: 'smooth' });
  }

  return (
      <section className={burgerIngredients.container}>
        <h1 className={burgerIngredients.title}>Соберите бургер</h1>
        <ul className={burgerIngredients.tabs}>
          <li className={burgerIngredients.tab}>
            <Tab value="bun" active={current === 'bun'} onClick={clickCategory}>
              Булки
            </Tab>
          </li>
          <li className={burgerIngredients.tab}>
            <Tab value="sauce" active={current === 'sauce'} onClick={clickCategory}>
                Соусы
            </Tab>
          </li>
          <li className={burgerIngredients.tab}>
            <Tab value="main" active={current === 'main'} onClick={clickCategory}>
                Начинки
            </Tab>
          </li>
        </ul>
        {array && (
        <div className={burgerIngredients.scrollBlock}>
          <h2 ref={bunRef} className={burgerIngredients.listTitle} id="bun">Булки</h2>
          <ul className={burgerIngredients.list}>
            {array.filter((item) => item.type === "bun").map((item, index)=>(
                <Card item={item} key={item._id}/>
            ))}
          </ul>
          <h2 ref={sauceRef} className={burgerIngredients.listTitle} id="sauce">Соусы</h2>
          <ul className={burgerIngredients.list}>
            {array.filter((item) => item.type === "sauce").map((item, index)=>(
              <Card item={item} key={item._id}/>
            ))}
          </ul>
          <h2 ref={mainRef} className={burgerIngredients.listTitle} id="main">Начинки</h2>
          <ul className={burgerIngredients.list}>
            {array.filter((item) => item.type === "main").map((item, index)=>(
              <Card item={item} key={item._id}/>
            ))}
          </ul>
        </div>)}
      </section>
  )
};

BurgerIngredients.propTypes = {
  onClickDesc: PropTypes.func.isRequired
};
