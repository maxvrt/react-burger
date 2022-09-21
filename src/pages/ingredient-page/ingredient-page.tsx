import styles from './ingredient-page.module.css';
import IngredientDetails from "../../components/ingredient-details/ingredient-details"

const IngredientPage = () => {
  return (
     <div className={styles.wrapper}>
        <h1 className={styles.title}>Детали ингредиента</h1>
        <IngredientDetails/>
     </div>
  )
}

export default IngredientPage
