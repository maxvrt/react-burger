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

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestIngredients());
  }, [dispatch]);
  const array = useSelector(store => (store.ingredients.ingredients));
  const oneBun = useSelector(store => (store.ingredients.bun));
  const ingredientModal = useSelector(store => (store.ingredients.ingredientDesc));
  const isOpenModal = useSelector(store => (store.ingredients.ingredientModal));
  const [arrIds, setArrIds] = useState([]);
  //const [isOrderDetailsOpened, setIsOrderDetails] = useState(false);
  const isOpenModalOrder = useSelector(store => (store.ingredients.orderModal));
  const [modalData, setModalData] = useState(null);

  const orderData = useSelector(store =>  (store.ingredients.orderData));
  const isOrderModal = useSelector(store =>  (store.ingredients.orderModal));
  // Закрытие всех модалок
  const closeAllModals = () => {
    dispatch({type:'INGREDIENT_MODAL_DEL' });
    dispatch({type:'ORDER_MODAL_DEL' });
    //setIsOrderDetails(false);
  };
  // кнопка оформления заказа перенесена в burgerConstructor

  // нажатие по элементу списка
  const displayDesc = (item)=>{
    dispatch({type:'INGREDIENT_MODAL_ADD', payload: item });
    // setIngredient(item);
    // setIsIngredientDetails(true);
  }
  return (
    <>
      <AppHeader/>
      <main className={app.main}>
        <ModalDataContext.Provider value={setModalData}>
        <BurgerIngredientsContext.Provider value={array}>
        {array && (
          <BurgerIngredients onClickDesc={displayDesc}/>
        )}
          <BurgerConstructor oneBun={oneBun}/>
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

    </>
  );
}

export default App;
