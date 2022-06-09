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
        <div className="item">Калории, ккал</div>
        <div className="item">Белки, г</div>
        <div className="item">Жиры, г</div>
        <div className="item">Углеводы, г</div>
        <div className="item">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
        <div className="item">4</div>
      </div>
    </div>
)
}
