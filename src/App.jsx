import React from 'react';
import './App.css';
import AppHeader from './components/app-header/App-header';
import BurgerIngredients from './components/burger-ingredients/Burger-ingredients';
import BurgerConstructor from './components/burger-constructor/Burger-constructor';
import data from './utils/data.js'

function App() {
  return (
    <>
      <AppHeader/>
      <main className='main'>
        <BurgerIngredients array={data}/>
        <BurgerConstructor array={data}/>
      </main>
    </>
  );
}

export default App;
