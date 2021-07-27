import React, { useRef, useState } from "react";
// import { useDrag } from "react-dnd";

// import { Draggable } from "react-beautiful-dnd";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { initDragging , stopDragging } from "./boardSlice";


const Token =  ({color , id }) => {
    console.log("Token reideering")
    const tokenPosition  =   useSelector(state => state.board.dragTokenPosition);
    const currentlyDraggdToken  = useSelector(state => state.board.dragToken);
    const isDraggable =  !currentlyDraggdToken || id === currentlyDraggdToken;
    const dispatch  = useDispatch();
    const getPosition   = () => {
        return isDraggable ? tokenPosition : {x: 0 , y: 0}
    }

    const handleStartDragging  =  event => {
        console.log(`Token.handleStartDragging()`);
        let position = {x: event.clientX , y : event.clientY};
        dispatch(initDragging({position: position , tokenId: id}));
    }

    const handleStopDragging  = event => {
        console.log(`Token.handleStopDragging()`);
        let position = {x: event.clientX , y : event.clientY};
        dispatch(stopDragging({dragStopPosition : position}));
        
    }


    return (
        <Draggable
            onStart={handleStartDragging}
            onStop={handleStopDragging}
            onDrag={f => f}
            disabled={!isDraggable}
            position={getPosition()}
        >
            <div className={`token token-${color}`} />
        </Draggable>

    )

}

export default React.memo(Token);