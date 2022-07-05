import React, {useEffect, useState}  from 'react';
import AppHeader from '../app-header/App-header';
import BurgerIngredients from '../burger-ingredients/Burger-ingredients';
import BurgerConstructor from '../burger-constructor/Burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/Modal';
import app from './app.module.css';
import {getIngredients} from '../../utils/api';
import BurgerIngredientsContext from "../../context/burger-ingredients-context";
import OrderDetailsContext from "../../context/order-details-context";
import ModalDataContext from "../../context/modal-data-context";

function App() {
  const [array, setArray] = useState([]);
  const [oneBun, setBun] = useState({});
  //const [arrIds, setArrIds] = useState([]);
  const [isOrderDetailsOpened, setIsOrderDetails] = useState(false);
  const [ingredientDetailsOpened, setIsIngredientDetails] = useState(false);
  const [ingredient, setIngredient] = useState({});
  const [modalData, setModalData] = useState(null);
  // Закрытие всех модалок
  const closeAllModals = () => {
    setIsOrderDetails(false);
    setIsIngredientDetails(false);
  };
  // кнопка оформления заказа перенесена в burgerConstructor

  const displayDesc = (item)=>{
    setIngredient(item);
    setIsIngredientDetails(true);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_INGREDIENTS
    });
    getIngredients()
    .then(res =>  {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}: ${res}`);
    }).then((data) => {
      //setArray(data.data);
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: data.data
      });
      const bun = data.data.find(a=> a.type === "bun");
      setBun(bun);
    }).catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_ERROR
      });
      console.log('Ошибка. Запрос не выполнен: ' + err);
    })
  }, []);


  return (
    <>
      <AppHeader/>
      <main className={app.main}>
        <ModalDataContext.Provider value={setModalData}>
        <OrderDetailsContext.Provider value={setIsOrderDetails}>
        <BurgerIngredientsContext.Provider value={array}>
          <BurgerIngredients onClickDesc={displayDesc}/>
          <BurgerConstructor oneBun={oneBun}/>
        </BurgerIngredientsContext.Provider>
        </OrderDetailsContext.Provider>
        </ModalDataContext.Provider>
      </main>
      {isOrderDetailsOpened &&
        <Modal
          title=""
          onOverlayClick={closeAllModals}
          onCloseClick={closeAllModals}
          escCloseModal={closeAllModals}
        >
          <OrderDetails data={modalData}/>
        </Modal>
      }
       {ingredientDetailsOpened &&
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          onCloseClick={closeAllModals}
          escCloseModal={closeAllModals}
        >
          <IngredientDetails data={ingredient}/>
        </Modal>
      }

    </>
  );
}

export default App;
