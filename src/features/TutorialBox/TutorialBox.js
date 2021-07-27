import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTutorialBoxView } from "./tutorialBoxSlice";
import "./Tutorial.css";


export function TutorialBox(){
    const dispatch  = useDispatch();
    const onTutorial  = () => dispatch(toggleTutorialBoxView());

    const isTutorialBoxOpen  =  useSelector(state => state.tutorialBox.isOpen);
    if (!isTutorialBoxOpen) { return null; }
    
    return (
        <div className="tutorial-box-wrapper">
            <div className="tutorial-box">
                <h4><strong>Tutorial</strong></h4>
                <p className="tutorial-explainer">
                    Place the tiles such that the red ones are put in place of the blue ones.
                    You can only move a token in an adjacent empty space. 
                    Good luck!
                </p>
                <button
                    onClick={() => dispatch(toggleTutorialBoxView())} 
                    className="button button-tutorial-close">
                    Close
                </button>
            </div>
        </div>
    )
}