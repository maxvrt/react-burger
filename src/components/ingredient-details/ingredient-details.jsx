import ingredientDetails from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types'


export default function IngredientDetails({data}) {

  return (
    <div className={ingredientDetails.container}>
      <img src={data.image_large} alt="" className={ingredientDetails.img}/>
      <p className={ingredientDetails.name}>{data.name}</p>
      <div className={ingredientDetails.table}>
        <div className={ingredientDetails.item}>Калории,ккал</div>
        <div className={ingredientDetails.item}>Белки, г</div>
        <div className={ingredientDetails.item}>Жиры, г</div>
        <div className={ingredientDetails.item}>Углеводы, г</div>
        <div className={ingredientDetails.digit}>{data.calories}</div>
        <div className={ingredientDetails.digit}>{data.proteins}</div>
        <div className={ingredientDetails.digit}>{data.fat}</div>
        <div className={ingredientDetails.digit}>{data.carbohydrates}</div>
      </div>
    </div>
)
}
IngredientDetails.propTypes = {
  data: ingredientPropType.isRequired
};
