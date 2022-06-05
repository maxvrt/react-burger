import React from 'react';
import './App.css';
import AppHeader from './components/app-header/App-header'
import BurgerIngredients from './components/burger-ingredients/Burger-ingredients'
import data from './utils/data.js'

function App() {
  return (
    <>
      <AppHeader/>
      <main className='main'>
        <BurgerIngredients array={data}/>
        <p className='test'>222</p>
      </main>
    </>
  );
}

export default App;
