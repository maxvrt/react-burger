import React, {useEffect}  from 'react';
import AppHeader from '../app-header/App-header';
import BurgerIngredients from '../burger-ingredients/Burger-ingredients';
import BurgerConstructor from '../burger-constructor/Burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/Modal';
//import data from '../../utils/data.js'
import app from './app.module.css';

function App() {
  const config = {
    baseUrl: "https://norma.nomoreparties.space/api/ingredients",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [array, setArray] = React.useState([]);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);

  // Закрытие всех модалок
  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };
  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };
  const testModal = ()=>{
    setIsOrderDetailsOpened(true);
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
        <BurgerIngredients array={array}/>
        <BurgerConstructor array={array}/>
      </main>
      <p onClick={testModal}>тест модалки</p>
      {isOrderDetailsOpened &&
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <IngredientDetails/>
          {/*<OrderDetails ... />  вложенное содержимое, идет в пропс children */}
        </Modal>
      }

    </>
  );
}

export default App;
