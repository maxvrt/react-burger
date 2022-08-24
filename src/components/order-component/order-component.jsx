import styles from './order-component.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Routes, Route, useParams, useRouteMatch  } from 'react-router-dom';
import { useEffect, useMemo  } from 'react';

const OrderComponent = () => {
  const {id} = useParams();
  const idNum = Number(id);
  const { userData, data, ingredients } = useSelector(store => ({
    userData: store.rootWsAuth.userData,
    data: store.rootWs.data,
    ingredients: store.rootIngredients.ingredients,
  }));

  const match = useRouteMatch()
  const isUser = match.path === '/profile/orders/:id';
  let newData = isUser ? userData : data;
  let oneOrder;
  let date;
  let countOrderIds = [];
  let newIngredients;
  let price = 0 ;
  if (newData.orders && Object.keys(newData.orders).length > 0) {
    console.log('заказы:');
    console.log(newData.orders);
    oneOrder = newData.orders.find((order) => order.number === idNum);
    date = new Date(oneOrder?.createdAt).toISOString().slice(0, 16);
    // уникальные ингредиенты и их кол-во
    for (let elem of oneOrder.ingredients) {
      if (!countOrderIds[elem]) {
        countOrderIds[elem] = 1;
      } else {
        countOrderIds[elem]++;
      }
    };
    newIngredients = Object.keys(countOrderIds).map(id => {
      return ingredients.find(function (ingredient) {
        if (ingredient._id === id)  price = price + ingredient.price*countOrderIds[ingredient._id];
        return ingredient._id === id;
      });
    });
  }

  return (
    ingredients && oneOrder && (
      <div className={styles.container}>
         <p className={styles.number}>#{oneOrder.number}</p>
        <h1 className={styles.title}>{oneOrder.name}</h1>
        <p className={styles.status}>
           {oneOrder?.status === 'done' ? 'Выполнен' :
            oneOrder?.status === 'pending' ? 'Готовится' :
            oneOrder?.status === 'created' ? 'Создан' : ''}
        </p>
        <p className={styles.compound}>Состав:</p>
        <ul className={styles.scroll}>
        {
          newIngredients.map((item, index) => {
            return (
            <li className={styles.element} key={index}>
              <img className={styles.img} src={item.image_mobile} alt={item.name} />
              <p className={styles.desc}>{item.name}</p>
              <p className={styles.priceDigit}>{countOrderIds[item._id]} x {item.price}</p>
              <div className={styles.icon}>
                <CurrencyIcon type="primary"/>
              </div>
            </li>
            )
          })
        }
        </ul>
        <div className={styles.footer}>
          <p className={styles.data}>{date}</p>
          <div className={styles.price}>
            <p className={styles.priceDigit}>{price}</p>
            <div className={styles.icon}>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>
      </div>
      ) ||
      <div className={styles.footer}>НЕТ ДАННЫХ</div>
  );
};

export default OrderComponent;
