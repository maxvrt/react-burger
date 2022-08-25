import appHeader from './app-header.module.css';
import { Logo, Typography, Box, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, Redirect, useRouteMatch } from 'react-router-dom';

export default function AppHeader() {
  const isConstructor = !!useRouteMatch({ exact: true, path: "/" });
  const isProfile = !!useRouteMatch({ exact: true, path: '/profile' });
  const isOrders = !!useRouteMatch({ exact: true, path: '/feed' });
return (
  <header className={appHeader.app}>
    <div className={appHeader.wrapper}>
      <nav className={appHeader.menuWrapper}>
        <ul className={appHeader.menuList}>
          <li className={appHeader.menuItem}>
            <NavLink className={appHeader.link} activeClassName={appHeader.activeLink} exact to='/'>
              <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default">Конструктор</p>
            </NavLink>
            </li>
          <li className={appHeader.menuItem}>
            <NavLink className={appHeader.link} activeClassName={appHeader.activeLink} exact to='/feed'>
              <ListIcon type={isOrders ? 'primary' : 'secondary'} />
              <p className={`text text_type_main-default`}>Лента заказов</p>
            </NavLink>
          </li>
        </ul>
      </nav>
      <NavLink exact to="/">
        <Logo/>
      </NavLink>
      <div className={appHeader.cabinet}>
        <NavLink exact to='/profile' className={appHeader.link} activeClassName={appHeader.activeLink}>
          <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
          <p className="text text_type_main-default">Личный кабинет</p>
        </NavLink>
      </div>
    </div>
  </header>
)
};
