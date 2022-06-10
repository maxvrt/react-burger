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
  const [oneBun, setBun] = useState({});
  const [isOrderDetailsOpened, setIsOrderDetails] = useState(false);
  const [ingredientDetailsOpened, setIsIngredientDetails] = useState(false);
  const [ingredient, setIngredient] = useState({});
  // Закрытие всех модалок
  const closeAllModals = () => {
    setIsOrderDetails(false);
    setIsIngredientDetails(false);
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
        <BurgerIngredients onClickDesc={displayDesc} array={array} />
        <BurgerConstructor onClickOrder={displayOrdering} array={array} oneBun={oneBun}/>
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
