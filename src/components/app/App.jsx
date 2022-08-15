import {useEffect, useState}  from 'react';
import AppHeader from '../app-header/App-header';
import BurgerIngredients from '../burger-ingredients/Burger-ingredients';
import BurgerConstructor from '../burger-constructor/Burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/Modal';
import app from './app.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { requestIngredients, checkUserAuth, getUserProfile} from "../../services/actions/all-actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { INGREDIENT_MODAL_DEL, ORDER_MODAL_DEL, INGREDIENT_MODAL_ADD } from "../../services/actions/all-actions";
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import RegisterPage from '../../pages/register-page/register-page';
import LoginPage from '../../pages/login-page/login-page';
import ForgotPage from '../../pages/forgot-page/forgot-page';
import ResetPage from '../../pages/reset-page/reset-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import { getCookie, setCookie } from '../../utils/cookie'
import { Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import ProtectedRoute from '../protected-route/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const token = getCookie('token');
  const refreshToken = getCookie('refreshToken');
  const { tokenSuccess, tokenData } = useSelector(store =>  ({tokenSuccess: store.rootAuth.postTokenSuccess, tokenData: store.rootAuth.tokenData}));
  const user = useSelector(store =>  (store.rootAuth.user));
  const loginSuccess = useSelector(store =>  (store.rootAuth.postLoginSuccess));
  useEffect(() => {
    dispatch(checkUserAuth());
    if (!user && token && refreshToken) {
      dispatch(getUserProfile());
    }
    if (token && tokenSuccess) {
      dispatch(getUserProfile())
    }
  }, [user,token,refreshToken,tokenSuccess, loginSuccess]);

  useEffect(() => {
    dispatch(requestIngredients());
    //dispatch(checkUserAuth());
  }, [dispatch]);

  const location = useLocation();
  const background = location.state?.background;
  const history = useHistory();
  const arrayIngredients = useSelector(store => (store.rootIngredients.ingredients));
  const ingredientModal = useSelector(store => (store.rootIngredients.ingredientDesc));
  const isOpenModal = useSelector(store => (store.rootIngredients.ingredientModal));

  const orderData = useSelector(store =>  (store.rootIngredients.orderData));
  const isOrderModal = useSelector(store =>  (store.rootIngredients.orderModal));
  // Закрытие всех модалок
  const closeAllModals = () => {
    dispatch({type:INGREDIENT_MODAL_DEL});
    dispatch({type:ORDER_MODAL_DEL});
    history.goBack();
  };

  return (
    <div className={app.page}>
      <AppHeader/>
        <Switch location={background || location}>
          <Route exact path="/">
            <DndProvider backend={HTML5Backend}>
              <main className={app.main}>
                {arrayIngredients && (
                  <BurgerIngredients/>
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
          <ProtectedRoute exact path='/profile'>
            <ProfilePage/>
          </ProtectedRoute>
          <Route exact path='/ingredient/:id'>
            <IngredientPage />
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

        {background &&
          <Route exact path="/ingredient/:id">
            <Modal
              title="Детали ингредиента"
              onOverlayClick={closeAllModals}
              onCloseClick={closeAllModals}
              escCloseModal={closeAllModals}
            >
              <IngredientDetails data={ingredientModal}/>
            </Modal>
            {/* <Modal
              title="Детали ингредиента" onClose={onClose}
            >
              <IngredientDetails />
            </Modal> */}
          </Route>
        }

        {/*
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
        */}

    </div>
  );
}

export default App;
