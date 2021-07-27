import React from "react";
import { useDispatch } from "react-redux";
import { onPrev , onNext  , onNewGame } from "../board/boardSlice";
import { toggleTutorialBoxView } from "../TutorialBox/tutorialBoxSlice";


const Controls  =  () => {
    const dispatch  = useDispatch();

    const onRestart   = () => dispatch(onNewGame({}));
    const onUndo  =  () => dispatch(onPrev({}));
    const onRedo =  () => dispatch(onNext({}));
    const onTutorial  = () => dispatch(toggleTutorialBoxView());
    
    return (
        <div className="controls">
          <button className="button-control" 
                  onClick={onRestart}>Restart</button>
          <button className="button-control"
                  onClick={onUndo}>Undo</button>
          <button className="button-control"
                  onClick={onRedo}>Redo</button>
          <button className="button-control"
                  onClick={onTutorial}>Tutorial</button>          
        </div>   
    )
}

export default Controls;