import ingredientDetails from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect}  from 'react';
import { requestIngredients} from "../../services/actions/all-actions";

export default function IngredientDetails() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestIngredients());
  }, [dispatch]);
  const ingredients = useSelector(state => (state.rootIngredients.ingredients));
  const { id } = useParams();
  const ing = ingredients.find((item) => { return item._id === id })
  return (
    ing && (
    <div className={ingredientDetails.container}>
      <img src={ing.image_large} alt="" className={ingredientDetails.img}/>
      <p className={ingredientDetails.name}>{ing.name}</p>
      <div className={ingredientDetails.table}>
        <div className={ingredientDetails.item}>Калории,ккал</div>
        <div className={ingredientDetails.item}>Белки, г</div>
        <div className={ingredientDetails.item}>Жиры, г</div>
        <div className={ingredientDetails.item}>Углеводы, г</div>
        <div className={ingredientDetails.digit}>{ing.calories}</div>
        <div className={ingredientDetails.digit}>{ing.proteins}</div>
        <div className={ingredientDetails.digit}>{ing.fat}</div>
        <div className={ingredientDetails.digit}>{ing.carbohydrates}</div>
      </div>
    </div>
    ) ||
    !ing && ('ничего не найдено')
  )
}
