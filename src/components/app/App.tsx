import {useEffect, useState}  from 'react';
import AppHeader from '../app-header/App-header';
import BurgerIngredients from '../burger-ingredients/Burger-ingredients';
import BurgerConstructor from '../burger-constructor/Burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/Modal';
import app from './app.module.css';
import { useDispatch, useSelector } from '../../types/types';
import { requestIngredients, INGREDIENT_MODAL_DEL, ORDER_MODAL_DEL} from "../../services/actions/burger-actions";
import { checkUserAuth, getUserProfile, runRefreshToken} from "../../services/actions/auth-actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import RegisterPage from '../../pages/register-page/register-page';
import LoginPage from '../../pages/login-page/login-page';
import ForgotPage from '../../pages/forgot-page/forgot-page';
import ResetPage from '../../pages/reset-page/reset-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import { getCookie } from '../../utils/cookie'
import ProtectedRoute from '../protected-route/ProtectedRoute';
import FeedPage from '../../pages/feed-page/feed-page';
import OrderPage from '../../pages/order-page/order-page';
import UserOrdersPage from '../../pages/user-orders-page/user-orders-page';
import OrderComponent from '../order-component/order-component';
import OrderSecond from '../../pages/order-second/order-second';
import { Location } from "history";

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

function App() {
  const dispatch = useDispatch();
  const token = getCookie('token');
  const refreshToken = getCookie('refreshToken');
  const { tokenSuccess, tokenData, userError, errorMess } = useSelector(store =>  ({tokenSuccess: store.rootAuth.postTokenSuccess, tokenData: store.rootAuth.tokenData, userError: store.rootAuth.getUserError, errorMess: store.rootAuth.errorMessage}));
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


  const history = useHistory();
  const arrayIngredients = useSelector(store => (store.rootIngredients.ingredients));
  const ingredientModal = useSelector(store => (store.rootIngredients.ingredientDesc));
  const isOpenModal = useSelector(store => (store.rootIngredients.ingredientModal));

  const orderData = useSelector(store =>  (store.rootIngredients.orderData));
  const isOrderModal = useSelector(store =>  (store.rootIngredients.orderModal));
  // Закрытие всех модалок
  const closeModals = () => {
    dispatch({type:INGREDIENT_MODAL_DEL});
    dispatch({type:ORDER_MODAL_DEL});
  };
  const closeModalIng = () => {
    dispatch({type:INGREDIENT_MODAL_DEL});
    dispatch({type:ORDER_MODAL_DEL});
    history.goBack();
  };

  const location =  useLocation<{background: Location}>();
  const background =  location.state?.background;

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
          <Route exact path='/feed'>
            <FeedPage />
          </Route>

          <Route exact path='/profile/orders'>
            <UserOrdersPage />
          </Route>
          <Route exact path='/feed/:id'>
            <OrderSecond />
          </Route>
          <Route exact path='/profile/orders/:id'>
            <OrderSecond />
          </Route>
          <Route>
            Page404
          </Route>
        </Switch>

        {isOrderModal &&
          <Modal
            title=""
            onOverlayClick={closeModals}
            onCloseClick={closeModals}
            escCloseModal={closeModals}
          >
            <OrderDetails/>
          </Modal>
        }

        {background &&
        <>
          <Route exact path="/ingredient/:id">
            <Modal
              title="Детали ингредиента"
              onOverlayClick={closeModalIng}
              onCloseClick={closeModalIng}
              escCloseModal={closeModalIng}
            >
              <IngredientDetails/>
              {/* data={ingredientModal} */}
            </Modal>
          </Route>
          <Route exact path="/profile/orders/:id">
            <Modal
              onOverlayClick={closeModalIng}
              onCloseClick={closeModalIng}
              escCloseModal={closeModalIng}
            >
              <OrderComponent/>
            </Modal>
          </Route>
          <Route exact path="/feed/:id">
            <Modal
              onOverlayClick={closeModalIng}
              onCloseClick={closeModalIng}
              escCloseModal={closeModalIng}
            >
              <OrderComponent/>
            </Modal>
          </Route>
        </>
        }
    </div>
  );
}

export default App;
