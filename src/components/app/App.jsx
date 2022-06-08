import React from 'react';
import AppHeader from '../app-header/App-header';
import BurgerIngredients from '../burger-ingredients/Burger-ingredients';
import BurgerConstructor from '../burger-constructor/Burger-constructor';
import data from '../../utils/data.js'
import app from './app.module.css';

function App() {
  return (
    <>
      <AppHeader/>
      <main className={app.main}>
        <BurgerIngredients array={data}/>
        <BurgerConstructor array={data}/>
      </main>
    </>
  );
}

export default App;
