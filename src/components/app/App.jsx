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
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RegisterPage from '../../pages/register-page/register-page';
import LoginPage from '../../pages/login-page/login-page';
import ForgotPage from '../../pages/forgot-page/forgot-page';
import ResetPage from '../../pages/reset-page/reset-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import { getCookie, setCookie } from '../../utils/cookie'
import { runRefreshToken, runLogOut } from '../../services/actions/all-actions'
import { Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

function App() {
  const dispatch = useDispatch();
  const token = getCookie('token');
  const { tokenSuccess, tokenData } = useSelector(store =>  ({tokenSuccess: store.rootAuth.postTokenSuccess, tokenData: store.rootAuth.tokenData}));
  const logoutSuccess = useSelector(store =>  (store.rootAuth.postLogoutSuccess));

  useEffect(() => {
    const refreshToken = getCookie('refreshToken');
    // нужно ли обновление токена?
    if (!token && refreshToken) {
      dispatch(runRefreshToken(refreshToken));
    };
  }, [token]);

  useEffect(() => {
    dispatch(requestIngredients());
  }, [dispatch]);

  // обновление токена
  if (tokenSuccess) {
    const accessToken = tokenData.accessToken.split('Bearer ')[1];
    const refreshToken = tokenData.refreshToken;
    console.log("новый токен : " + accessToken);
    setCookie('token', accessToken);
    setCookie('refreshToken', refreshToken);
  }
  // Выход
  const logOut = () => {
    const refreshToken = getCookie('refreshToken');
    console.log('выходим '+ refreshToken);
    dispatch(runLogOut(refreshToken));
  }
  if (logoutSuccess) {
    console.log("ВЫШЛИ ИЗ ПРИЛОЖЕНИЯ");
  }
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
                  <Button
                     onClick={logOut}>
                     Logout
                  </Button>
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
          <Route exact path="/profile">
            <ProfilePage/>
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
