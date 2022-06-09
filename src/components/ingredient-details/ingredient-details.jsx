import React, { useEffect,useRef } from 'react';
import ingredientDetails from './ingredient-details.module.css';
import { CloseIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types'


export default function IngredientDetails({item}) {

  return (
    <div className={ingredientDetails.container}>
      <img src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" className={ingredientDetails.img}/>
      <p className={ingredientDetails.name}>имя</p>
      <div className={ingredientDetails.table}>
        <div className={ingredientDetails.item}>Калории,ккал</div>
        <div className={ingredientDetails.item}>Белки, г</div>
        <div className={ingredientDetails.item}>Жиры, г</div>
        <div className={ingredientDetails.item}>Углеводы, г</div>
        <div className={ingredientDetails.digit}>1</div>
        <div className={ingredientDetails.digit}>2</div>
        <div className={ingredientDetails.digit}>3</div>
        <div className={ingredientDetails.digit}>4</div>
      </div>
    </div>
)
}
