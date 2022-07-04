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

function App() {
  const [array, setArray] = useState([]);
  const [oneBun, setBun] = useState({});
  //const [arrIds, setArrIds] = useState([]);
  const [isOrderDetailsOpened, setIsOrderDetails] = useState(false);
  const [ingredientDetailsOpened, setIsIngredientDetails] = useState(false);
  const [ingredient, setIngredient] = useState({});
  // Закрытие всех модалок
  const closeAllModals = () => {
    setIsOrderDetails(false);
    setIsIngredientDetails(false);
  };
  //todo кнопка оформления заказа
  // const displayOrdering = ()=>{
  //   setIsOrderDetails(true);
  // }
  const displayDesc = (item)=>{
    setIngredient(item);
    setIsIngredientDetails(true);
  }

  useEffect(() => {
    getIngredients()
    .then(res =>  {if (res.ok) {
      return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}: ${res}`);
    }).then((data) => {
      setArray(data.data);
      const bun = data.data.find(a=> a.type === "bun");
      setBun(bun);
    }).catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ' + err);
    });
  }, []);


  return (
    <>
      <AppHeader/>
      <main className={app.main}>
        {/* замена пропсов на контекст */}
        <OrderDetailsContext.Provider value={setIsOrderDetails}>
        <BurgerIngredientsContext.Provider value={array}>
          <BurgerIngredients onClickDesc={displayDesc}/>
          <BurgerConstructor oneBun={oneBun}/>
          {/* onClickOrder={displayOrdering} */}
        </BurgerIngredientsContext.Provider>
        </OrderDetailsContext.Provider>
      </main>
      {isOrderDetailsOpened &&
        <Modal
          title=""
          onOverlayClick={closeAllModals}
          onCloseClick={closeAllModals}
          escCloseModal={closeAllModals}
        >
          <OrderDetails/>
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
