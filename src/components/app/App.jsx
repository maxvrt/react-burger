import {useEffect, useState}  from 'react';
import AppHeader from '../app-header/App-header';
import BurgerIngredients from '../burger-ingredients/Burger-ingredients';
import BurgerConstructor from '../burger-constructor/Burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/Modal';
import app from './app.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { requestIngredients } from "../../services/actions/all-actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { INGREDIENT_MODAL_DEL, ORDER_MODAL_DEL, INGREDIENT_MODAL_ADD } from "../../services/actions/all-actions";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterPage from '../../pages/register-page/register-page';
import LoginPage from '../../pages/login-page/login-page';
import ForgotPage from '../../pages/forgot-page/forgot-page';
import ResetPage from '../../pages/reset-page/reset-page';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestIngredients());
  }, [dispatch]);
  const arrayIngredients = useSelector(store => (store.rootIngredients.ingredients));
  const ingredientModal = useSelector(store => (store.rootIngredients.ingredientDesc));
  const isOpenModal = useSelector(store => (store.rootIngredients.ingredientModal));

  const orderData = useSelector(store =>  (store.rootIngredients.orderData));
  const isOrderModal = useSelector(store =>  (store.rootIngredients.orderModal));
  // Закрытие всех модалок
  const closeAllModals = () => {
    dispatch({type:INGREDIENT_MODAL_DEL});
    dispatch({type:ORDER_MODAL_DEL});
  };

  // нажатие по элементу списка
  const displayDesc = (item)=>{
    dispatch({type:INGREDIENT_MODAL_ADD, payload: item });
  }
  return (
    <div className={app.page}>
      <AppHeader/>
      <Router>
        <Switch>
          <Route exact path="/">
            <DndProvider backend={HTML5Backend}>
              <main className={app.main}>
                {arrayIngredients && (
                  <BurgerIngredients onClickDesc={displayDesc}/>
                )}
                  <BurgerConstructor/>
              </main>
            </DndProvider>
          </Route>
          <Route exact path="/login">
            <LoginPage/>
          </Route>
          <Route exact path="/register">
            <RegisterPage/>
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPage/>
          </Route>
          <Route exact path="/reset-password">
            <ResetPage/>
          </Route>
          <Route>
            Page404
          </Route>

        </Switch>

        {isOrderModal &&
          <Modal
            title=""
            onOverlayClick={closeAllModals}
            onCloseClick={closeAllModals}
            escCloseModal={closeAllModals}
          >
            <OrderDetails/>
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

      </Router>
    </div>
  );
}

export default App;
