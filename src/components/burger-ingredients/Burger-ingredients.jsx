import burgerIngredients from './burger-ingredients.module.css';
import { Counter, Tab, Box, Typography,  } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerIngredients() {
return (
  <header className={appHeader.app}>
    <div className={appHeader.wrapper}>
      <nav className={appHeader.menuWrapper}>
        <ul className={appHeader.menuList}>
          <li className={appHeader.menuItem}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
            </li>
          <li className={appHeader.menuItem}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default">Лента заказов</p>
          </li>
        </ul>
      </nav>
      <Logo/>
      <div className={appHeader.cabinet}>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default">Личный кабинет</p>
      </div>
    </div>
  </header>
)
};
