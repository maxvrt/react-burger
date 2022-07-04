import appHeader from './app-header.module.css';
import { Logo, Typography, Box, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader() {
return (
  <header className={appHeader.app}>
    <div className={appHeader.wrapper}>
      <nav className={appHeader.menuWrapper}>
        <ul className={appHeader.menuList}>
          <li className={appHeader.menuItem}>
            <a href="#" className={appHeader.link}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default">Конструктор</p>
            </a>
            </li>
          <li className={appHeader.menuItem}>
            <a href="#" className={appHeader.link}>
              <ListIcon type="secondary" />
              <p className={`${appHeader.lent} text text_type_main-default`}>Лента заказов</p>
            </a>
          </li>
        </ul>
      </nav>
      <Logo/>
      <div className={appHeader.cabinet}>
        <a href="#" className={appHeader.link}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default">Личный кабинет</p>
        </a>
      </div>
    </div>
  </header>
)
};
