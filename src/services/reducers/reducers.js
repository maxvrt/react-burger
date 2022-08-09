import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  SET_BUN,
  MASS_ADD_INGREDIENTS,
  ADD_INGREDIENT,
  INGREDIENT_MODAL_ADD,
  INGREDIENT_MODAL_DEL,
  ORDER_MODAL_ADD,
  ORDER_MODAL_DEL,
  GET_ORDER_NUMBER,
  DELETE_ITEM,
  MOVE_ELEMENT,
  UPD,
  POST_FORGOT_PASS,
  POST_FORGOT_PASS_SUCCESS,
  POST_FORGOT_PASS_ERROR,
  POST_REGISTER,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_ERROR
} from '../actions/all-actions';

const initialAuth = {
  postForgotPass: false,
  postForgotPassSuccess: false,
  postForgotPassError: false,
  message: 'nothing',
  postRegister: false,
  postRegisterSuccess: false,
  postRegisterError: false,
  authData: {},
};

const initialIngredients = {
  ingredients: [],
  ingredientsError: false,
  selectedIngredients: [],
  bun: {},
  ingredientObject: {},
  ingredientModal: false,
  ingredientDesc: {},
  orderModal: false,
  orderError: false,
  orderData: {},
  upd:0,
};

export const authReducer = (state = initialAuth, action) => {
  switch (action.type) {
    case POST_FORGOT_PASS:  {
      return {
        ...state,
        postForgotPass: true,
        postForgotPassSuccess: false,
        postForgotPassError: false
      }
    }
    case POST_FORGOT_PASS_SUCCESS:  {
      return {
        ...state,
        postForgotPass: false,
        postForgotPassSuccess: true,
        postForgotPassError: false,
        message: action.payload
      }
    }
    case POST_FORGOT_PASS_ERROR:  {
      return {
        ...state,
        postForgotPass: false,
        postForgotPassSuccess: false,
        postForgotPassError: true
      }
    }
    
    case POST_REGISTER:  {
      return {
        ...state,
        postRegister: true,
        postRegisterSuccess: false,
        postRegisterError: false
      }
    }
    case POST_REGISTER_SUCCESS:  {
      return {
        ...state,
        postRegister: false,
        postRegisterSuccess: true,
        postRegisterError: false,
        authData: action.payload
      }
    }
    case POST_REGISTER_ERROR:  {
      return {
        ...state,
        postForgotPass: false,
        postForgotPassSuccess: false,
        postForgotPassError: true
      }
    }
    default: {
      return state;
    }
  }
}

export const ingredientsReducer = (state = initialIngredients, action) => {
  switch (action.type) {
    case UPD: {
      return {
        ...state,
        upd:true
      };
    }
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsLoading: true,
        ingredientsError: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsLoading: false,
        ingredientsError: false,
      };
    }
    case SET_BUN: {
      return {
        ...state,
        bun: action.payload
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsLoading: false,
        ingredientsError: true,
      };
    }
    case MASS_ADD_INGREDIENTS: {
      return {
        ...state,
        selectedIngredients: action.payload,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
      };
    }
    case INGREDIENT_MODAL_ADD: {
      return {
        ...state,
        ingredientModal: true,
        ingredientDesc: action.payload,
      };
    }
    case INGREDIENT_MODAL_DEL: {
      return {
        ...state,
        ingredientModal: false,
        ingredientDesc: {},
      };
    }
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        orderData: action.payload,
      };
    }
    case ORDER_MODAL_ADD: {
      return {
        ...state,
        orderModal: true
      };
    }
    case ORDER_MODAL_DEL: {
      return {
        ...state,
        orderModal: false
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients].filter(
          (item) => {
            return item.uuid !== action.payload;
          }
        ),
      };
    }
    case MOVE_ELEMENT: {
      const ingredients = [...state.selectedIngredients];
      ingredients.splice(
        action.payload.to,
        0,
        ingredients.splice(action.payload.from, 1)[0]
      );
      return {
        ...state,
        selectedIngredients: ingredients,
      };
    }

    default: {
      return state;
    }
  }
}
