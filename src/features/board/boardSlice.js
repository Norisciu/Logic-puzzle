import { createSlice , current } from "@reduxjs/toolkit";

const EMPTY_TILE =  "0";
const TRANSPARENT_TILE =  "#";
const colorsMap  =  new Map([
    ["r" , "red"] , 
    ["b" , "blue"], 
    ["S" , "square"]
]);
const gameMapUpdate = 
[
    "###b###",
    "##0b0##",
    "###b###",
    "rrrSrrr",
    "###b###",
    "##0b0##",
    "###b###",
].map(row => row.split(""));


const clamp  =  (low , value , high) => {
    if (value < low) { return low; }
    if (value > high) { return high; }
    return value;
}
 
const getRow  = ({x , y} , {boundingBox , rows , columns}) =>  {
    
    let tileHeight  = boundingBox.height  / rows;
    let tileWidth  =   boundingBox.width  /  columns;
    let row  = Math.floor((y  - boundingBox.y) / tileHeight);
    console.log(`--------------------------------getRow row ${row}`);
    // console.log(`clamp ${ clamp(0, row  , rows)} `);
    // console.log(`rows ${rows}`);
    return clamp(0, row  , rows - 1);
}

const getColumn  = ({x,y} , {boundingBox , rows , columns}) => {
    let tileHeight  = boundingBox.height  / rows;
    let tileWidth  =   boundingBox.width  /  columns;
    let column  = Math.floor((x  - boundingBox.x) / tileWidth);
    return clamp(0, column  , columns - 1);
}

const tileAtRowColumn   = (row , column , {tileMap}) => {
    return tileMap[row][column];
}


const canMoveFromTo  =  (fromTile , toTile , fromRow , fromColumn , toRow , toColumn) => {
    let rowDifference  =  Math.abs(fromRow - toRow);
    let columnDifference  = Math.abs(fromColumn -  toColumn);
    let properTiles  = toTile === EMPTY_TILE && !isEmptyTile(fromTile)
    // console.log(`canMoveFromTo properTiles ${properTiles}`);
    return properTiles 
           && ( (!columnDifference && rowDifference === 1) 
           || (!rowDifference && columnDifference === 1) ) ;
}

const moveTokenFromTo   = (fromRow , fromColumn , toRow , toColumn , {tileMap}) => {
    let resultBoard  =  tileMap.slice();
    resultBoard[toRow][toColumn] = resultBoard[fromRow][fromColumn];
    resultBoard[fromRow][fromColumn] =  EMPTY_TILE;
    return resultBoard;
}



export const isEmptyTile =  tile => tile === EMPTY_TILE || tile === TRANSPARENT_TILE;
export const isTransparentTile  = tile => tile === TRANSPARENT_TILE;
export const tileHasToken  =  tile => !isEmptyTile(tile);
export const getTokenColor =  tile => colorsMap.get(tile);



const initBoardState =  {
    tileMap : gameMapUpdate , 
    boundingBox  : null,
    rows : gameMapUpdate.length,
    columns : gameMapUpdate[0].length,
    dragToken : null,
    dragStartTokenCoords : null,
    dragTokenPosition : {x: 0 , y:0},
    moves : {
        movesCount : 0,
        movesHistory : [],
        currentMoveIdx : -1,
    }
};


const Board  =  createSlice({
    name : "board" , 
    initialState : initBoardState ,
    reducers : {

        setGridRef : (state , action ) => {
            console.log("BoardSlice.setGridRef()");
            console.log(action.payload);
            // if (state.boundingBox) { 
            //     throw Error("you can't set board boundingBox more than once"); 
            // }
            state.boundingBox  =  action.payload;
        },
        
        initDragging : (state , action) => {
            console.log("boardSlice.initDragging()");
            let { position , tokenId  } =  action.payload;
            state.dragStartTokenCoords  = position;
            state.dragToken  =  tokenId;
        },

        moveDragToken : (state , action) => {
            // moveTokenFromTo(action.payload);
            const {toRow , toColumn , fromRow , fromColumn} =  action.payload;
            let temp  = state.tileMap[toRow][toColumn];
            state.tileMap[toRow][toColumn] = state.tileMap[fromRow][fromColumn];
            state.tileMap[fromRow][fromColumn] = temp;
            state.dragToken = null;
            state.dragStartTokenCoords  = null;
        }, 

        stopDragging : (state , action) => {
            console.log("boardSlice.stopDragging()");
            console.log(current(state));
            // let {dragStopPosition , token} =  action.payload;
            let {dragStopPosition} = action.payload;
            let { dragStartTokenCoords } =  state;
            console.log(dragStartTokenCoords);
            console.log(state.dragStartTokenCoords);
            let fromRow  = getRow(dragStartTokenCoords , state);
            let fromColumn  = getColumn(dragStartTokenCoords , state);
            let toColumn = getColumn(dragStopPosition , state);
            let toRow =  getRow(dragStopPosition , state);

            // console.log(`stopDragging toRow ${toRow}`);
            
            let fromTile  = state.tileMap[fromRow][fromColumn];
            let toTile  =  state.tileMap[toRow][toColumn];


            if (canMoveFromTo(fromTile , toTile , fromRow , fromColumn , toRow , toColumn)){
                // moveTokenFromTo(fromTile , toTile);
                console.log("boardSlice move token")
                // state.tileMap[toRow][toColumn] = state.tileMap[fromRow][fromColumn];
                // state.tileMap[fromRow][fromColumn] =  EMPTY_TILE;
                state.tileMap  =  moveTokenFromTo(fromRow , fromColumn , toRow , toColumn , state);
                state.dragToken =  null;
                state.dragStartPosition =  {x: 0, y: 0};
                state.dragStartTokenCoords  = null;
                
                let madeMove  =  {
                    fromRow , fromColumn , toRow , toColumn
                };
                
                // state.moves.movesHistory.push(madeMove);
                let prevMoves  =  state.moves.movesHistory.slice(0 , state.moves.currentMoveIdx+1);
                prevMoves.push(madeMove);
                state.moves.movesHistory  = prevMoves;
                state.moves.movesCount++;
                state.moves.currentMoveIdx++;
            }

            else {
                console.log("boardSlice stopDragging() else");
                state.dragToken =  null;
                state.dragStartPosition =  {x: 0, y: 0};
                state.dragStartTokenCoords  = null;
            
            }
        },

        onPrev : (state , action) => {
            if (state.moves.currentMoveIdx < 0){ return; }
            let {movesHistory , movesCount , currentMoveIdx: currentMovePointer} =  state.moves;
            let currentMove  =  movesHistory[currentMovePointer];
            let {fromRow , fromColumn , toRow , toColumn} = currentMove;
            state.tileMap  =  moveTokenFromTo(toRow , toColumn , fromRow , fromColumn , state);
            state.moves.currentMoveIdx--;
            state.moves.movesCount--;

        } ,

        onNext : (state , action) => {
            if (state.moves.currentMoveIdx === state.moves.movesHistory.length - 1){ return; }
            let {movesHistory , movesCount , currentMoveIdx} =  state.moves;
            let currentMove  =  movesHistory[currentMoveIdx+1];
            let {fromRow , fromColumn , toRow , toColumn} = currentMove;
            state.tileMap  =  moveTokenFromTo(fromRow , fromColumn ,toRow , toColumn , state);
            state.moves.currentMoveIdx++;
            state.moves.movesCount++;
        },

        onNewGame : (state , action) => {
            console.log("dispatch onNewGame()");
            state.tileMap = gameMapUpdate;
            state.moves.movesCount = 0;
            state.moves.movesHistory = [];
            state.moves.currentMoveIdx = -1;
            
            // state  = { ...initBoardState};
            
            // const initBoardState =  {
            //     tileMap : gameMapUpdate , 
            //     boundingBox  : null,
            //     rows : gameMapUpdate.length,
            //     columns : gameMapUpdate[0].length,
            //     dragToken : null,
            //     dragStartTokenCoords : null,
            //     dragTokenPosition : {x: 0 , y:0},
            //     moves : {
            //         movesCount : 0,
            //         movesHistory : [],
            //         currentMoveIdx : -1,
            //     }
            // };
        } 






    }
})


export const {initDragging , setGridRef , stopDragging , onPrev , onNext , onNewGame} = Board.actions;
export default Board.reducer;


// export const isEmptyTile;
// export const tileHasToken;
// export const colrosMap;