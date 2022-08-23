import styles from './feed-card-component.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";

export default function FeedCardComponent({ name, number, ingredientIds, date, status = ' ' }) {
  const date2 = new Date(date).toISOString().slice(0, 16);
  const ingredients = useSelector(store => (store.rootIngredients.ingredients));
  let orderIngredients;
  let isLong;
  let price;
  if (ingredients) {
    isLong = Object.keys(ingredientIds).length > 6;
    orderIngredients = ingredientIds.map(elem => {
      return ingredients.filter(item => item._id === elem)[0];
    }).reverse()
    price = orderIngredients.reduce((accumulator, item) => accumulator + item.price, 0);
  }


  return (
    <div className={styles.container}>
      <div className={styles.topLeft}>#{number}</div>
      <div className={styles.topRight}>{date2}</div>
      <div className={styles.mid}>
        <p className={styles.midTitle}>{name}</p>
        <p className={styles.midStatus}>Создан</p>
      </div>
      <ul className={styles.bottomLeft}>
        { !isLong &&
          orderIngredients.map((elem, index) => (
            <li className={styles.imgBack} key={index}>
              <img className={styles.img} src={elem.image_mobile} alt={elem.name}/>
            </li>
          ))
        }
        { isLong &&
          orderIngredients.slice(5, 6).map((elem, index) => (
            <li className={styles.imgBack} key={index}>
              <div className={styles.boxLast}>
                <img className={styles.imgLast} src={elem.image_mobile} alt={elem.name}/>
                <div className={styles.numberLast}>{`+${ingredientIds.length - 6}`}</div>
              </div>

            </li>
          ))
        }
        { isLong &&
          orderIngredients.slice(0, 5).map((elem, index) => (
            <li className={styles.imgBack} key={index}>
              <img className={styles.img} src={elem.image_mobile} alt={elem.name}/>
            </li>
          ))
        }

      </ul>
      <div className={styles.bottomRight}>
        <p className={styles.price}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

FeedCardComponent.propTypes = {
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  ingredientIds: PropTypes.array.isRequired,
  status: PropTypes.string

}
