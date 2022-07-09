import {useEffect, useState}  from 'react';
import AppHeader from '../app-header/App-header';
import BurgerIngredients from '../burger-ingredients/Burger-ingredients';
import BurgerConstructor from '../burger-constructor/Burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/Modal';
import app from './app.module.css';
import BurgerIngredientsContext from "../../context/burger-ingredients-context";
import OrderDetailsContext from "../../context/order-details-context";
import ModalDataContext from "../../context/modal-data-context";
import { useSelector, useDispatch } from 'react-redux';
import { requestIngredients } from "../../services/reducers/reducers";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestIngredients());
  }, [dispatch]);
  const arrayIngredients = useSelector(store => (store.rootIngredients.ingredients));
  const ingredientModal = useSelector(store => (store.rootIngredients.ingredientDesc));
  const isOpenModal = useSelector(store => (store.rootIngredients.ingredientModal));
  const isOpenModalOrder = useSelector(store => (store.rootIngredients.orderModal));
  const [modalData, setModalData] = useState(null);

  const orderData = useSelector(store =>  (store.rootIngredients.orderData));
  const isOrderModal = useSelector(store =>  (store.rootIngredients.orderModal));
  // Закрытие всех модалок
  const closeAllModals = () => {
    dispatch({type:'INGREDIENT_MODAL_DEL' });
    dispatch({type:'ORDER_MODAL_DEL' });
  };

  // нажатие по элементу списка
  const displayDesc = (item)=>{
    dispatch({type:'INGREDIENT_MODAL_ADD', payload: item });
  }
  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <AppHeader/>
      <main className={app.main}>
        <ModalDataContext.Provider value={setModalData}>
        <BurgerIngredientsContext.Provider value={Ingredients}>
        {Ingredients && (
          <BurgerIngredients onClickDesc={displayDesc}/>
        )}
          <BurgerConstructor/>
        </BurgerIngredientsContext.Provider>
        </ModalDataContext.Provider>
      </main>
      {isOrderModal &&
        <Modal
          title=""
          onOverlayClick={closeAllModals}
          onCloseClick={closeAllModals}
          escCloseModal={closeAllModals}
        >
          <OrderDetails data={orderData}/>
        </Modal>
      }
       {isOpenModal &&
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          onCloseClick={closeAllModals}
          escCloseModal={closeAllModals}
        >
          <IngredientDetails data={ingredientModal}/>
        </Modal>
      }
    </DndProvider>
    </>
  );
}

export default App;
