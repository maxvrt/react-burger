import styles from './ingredient-page.module.css';
import IngredientDetails from "../../components/ingredient-details/ingredient-details"

const IngredientPage = () => {
  console.log('страница ингредиента');
  return (
     <div className={styles.wrapper}>
        <h1 className={styles.title}>Детали ингредиента</h1>
        <IngredientDetails/>

        {/* data={ingredientModal} <Modal
        title="Детали ингредиента"
        onOverlayClick={closeAllModals}
        onCloseClick={closeAllModals}
        escCloseModal={closeAllModals}
        >
        </Modal> */}
     </div>
  )
}

export default IngredientPage
