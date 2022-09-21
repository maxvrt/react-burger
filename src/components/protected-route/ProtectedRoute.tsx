import { FC } from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector, TProtectedRoute } from '../../types/types';

export const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
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
