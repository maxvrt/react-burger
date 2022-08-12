import { Route, useLocation, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCookie, setCookie } from '../../utils/cookie'

export function ProtectedRoute({ children, ...rest }) {
  const location = useLocation();
  const token = getCookie('token');
  if (!token) {
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
