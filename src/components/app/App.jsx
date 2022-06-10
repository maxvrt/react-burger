import React, {useEffect, useState}  from 'react';
import AppHeader from '../app-header/App-header';
import BurgerIngredients from '../burger-ingredients/Burger-ingredients';
import BurgerConstructor from '../burger-constructor/Burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/Modal';
import app from './app.module.css';
import config from '../../utils/config';

function App() {
  const [array, setArray] = useState([]);
  const [isOrderDetailsOpened, setIsOrderDetails] = useState(false);
  const [ingredientDetailsOpened, setIsIngredientDetails] = useState(false);
  const [ingredient, setIngredient] = useState({});
  // Закрытие всех модалок
  const closeAllModals = () => {
    setIsOrderDetails(false);
    setIsIngredientDetails(false);
  };
  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };
  const displayOrdering = ()=>{
    setIsOrderDetails(true);
  }
  const displayDesc = (item)=>{
    setIngredient(item);
    setIsIngredientDetails(true);
  }

  useEffect(() => {
    fetch(`${config.baseUrl}`, {headers: config.headers})
    .then(res =>  {if (res.ok) {
      return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}: ${res}`);
    }).then((data) => {
      setArray(data.data);
    }).catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ' + err);
    });
  }, []);


  return (
    <>
      <AppHeader/>
      <main className={app.main}>
        <BurgerIngredients onClickDesc={displayDesc} array={array} />
        <BurgerConstructor onClickOrder={displayOrdering} array={array}/>
      </main>
      {isOrderDetailsOpened &&
        <Modal
          title=""
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
          onCloseClick={closeAllModals}
        >
          <OrderDetails/>
        </Modal>
      }
       {ingredientDetailsOpened &&
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
          onCloseClick={closeAllModals}
        >
          <IngredientDetails data={ingredient}/>
        </Modal>
      }

    </>
  );
}

export default App;
