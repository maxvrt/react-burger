import { Route, useLocation, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCookie, setCookie } from '../../utils/cookie'

export function ProtectedRoute({ children, ...rest }) {
  const location = useLocation();
  const checkAuth = useSelector(store =>  (store.rootAuth.isAuthChecked));
  if (!checkAuth) {
    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: location },
      }}
      />
   )
  }
  console.log('пробуем перейти в профиль');
  return (
    <Route
      {...rest}
      render={ () => (
          children
        )
      }
    />
  );
}

export default ProtectedRoute
