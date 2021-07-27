import { createSlice } from "@reduxjs/toolkit"

const initState  = {
        isOpen : false
}
const TutorialSlice  =  createSlice({
    name : "board" , 
    initialState : initState ,
    reducers : {
        toggleTutorialBoxView : (state , action) => {
            state.isOpen = ! state.isOpen;
        }
    } 
});


export const { toggleTutorialBoxView } =  TutorialSlice.actions; 
export default TutorialSlice.reducer;
