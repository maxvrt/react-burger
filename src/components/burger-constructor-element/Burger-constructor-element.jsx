import React, { useRef } from 'react';
import burgerConstructor from './burger-constructor-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import { DELETE_ITEM, MOVE_ELEMENT}  from '../../services/actions/burger-actions';


export default function BurgerConstructorElement ({item, index}) {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const itemId = item.uuid;

    const deleteItem = (id) => {
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      });
    };

    const [{ handlerId }, drop] = useDrop({
      accept: ["SORT_INGREDIENT"],
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        //console.log(item);
        const hoverIndex = index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        dispatch({
          type: MOVE_ELEMENT,
          payload: { from: dragIndex, to: hoverIndex },
        });

        item.index = hoverIndex;
      },
    });
    const [{ }, drag] = useDrag({
      type: "SORT_INGREDIENT",
      item: () => {
        return { item, index };
      },
    });

    drag(drop(ref));

    return (
      <React.Fragment>
      <div className={burgerConstructor.scrollElement} data-handler-id={handlerId} ref={ref}>
        <DragIcon/>
        <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => deleteItem(itemId)}
        />
      </div>
      </React.Fragment>
    );
  };
