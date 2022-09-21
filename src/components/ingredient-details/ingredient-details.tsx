import ingredientDetails from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../types/types';
import type { TIngParam } from '../../types/types';

export default function IngredientDetails() {
  const ingredients = useSelector(state => (state.rootIngredients.ingredients));
  const { id } = useParams<TIngParam>();
  const ing = ingredients.find((item) => { return item._id === id })
  return (
   // ing && (
    <div className={ingredientDetails.container}>
      <img src={ing?.image_large} alt={ing?.name} className={ingredientDetails.img}/>
      <p className={ingredientDetails.name}>{ing?.name}</p>
      <div className={ingredientDetails.table}>
        <div className={ingredientDetails.item}>Калории,ккал</div>
        <div className={ingredientDetails.item}>Белки, г</div>
        <div className={ingredientDetails.item}>Жиры, г</div>
        <div className={ingredientDetails.item}>Углеводы, г</div>
        <div className={ingredientDetails.digit}>{ing?.calories}</div>
        <div className={ingredientDetails.digit}>{ing?.proteins}</div>
        <div className={ingredientDetails.digit}>{ing?.fat}</div>
        <div className={ingredientDetails.digit}>{ing?.carbohydrates}</div>
      </div>
    </div>
    //) || !ing && ('ничего не найдено')
  )
}
