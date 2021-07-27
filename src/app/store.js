import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import boardReducer from "../features/board/boardSlice";
import tutorialReducer from "../features/TutorialBox/tutorialBoxSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    board : boardReducer,
    tutorialBox : tutorialReducer
  },
});
