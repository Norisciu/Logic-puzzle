import React, { useEffect, useRef, useState } from "react";
import Tile from "./Tile";
import Token from "./Token";
import { useSelector , useDispatch } from "react-redux";
import { isEmptyTile , isTransparentTile ,  tileHasToken , getTokenColor , setGridRef  } from "./boardSlice";







const Board  =  function(){

    let gridRef   = useRef(null);
    let dispatch = useDispatch();
    let flatGameMap = useSelector(state  => state.board.tileMap.flatMap(row => row));
    let boardRows   = useSelector(state => state.board.rows);
    let boardColumns = useSelector(state => state.board.columns);
    
    // useEffect(() => console.log(gridRef && gridRef.current));
    
    useEffect(
        () => { 
            const {top, right, bottom, left, width, height, x, y} = gridRef.current.getBoundingClientRect();
            let boundingBox = {top, right, bottom, left, width, height, x, y};
            gridRef.current && dispatch(setGridRef(boundingBox)) 
        } , 
        [gridRef.current && gridRef.current.getBoundingClientRect().top]
    )

    let contents  =  flatGameMap.map( (tile , idx) => {
        if (isTransparentTile(tile)) { return null; }

        // console.log(`Board.contents() tile ${tile}`); 
        // console.log(tileHasToken(tile));
        let column  =  idx % boardColumns;
        let row  =  Math.floor(idx / boardRows);
        let token = tileHasToken(tile) ? 
                    <Token color={getTokenColor(tile)} id={idx} /> : 
                    null;
        return (
            <Tile key= {idx} column = { column } row =  {row} >
                {token}
            </Tile> )
    })
    console.log(contents);
    return (
        <div ref={gridRef} className="board-grid">
            {contents}
        </div>
    )
   
   



    // const controlDrag =  event => {
    //     let position  =  {x : event.clientX , y : event.clientY};
    //     setGridState({...gridState , tokenPosition: position})
    // }

    // const endDrag  =  event => {
    //     console.log("Board.endDrag()");
    //     // console.log(event);
    //     // mike
    //     let [posX , posY]  =  [event.clientX , event.clientY];
    //     let toRow  = getRow(posX , posY);
    //     let toColumn  =  getColumn(posX , posY);
    //     let [fromRow , fromColumn] = gridState.dragStartTokenCoords;
    //     if (checkMove(fromRow , fromColumn , toRow , toColumn)){
    //         moveToken(toRow , toColumn);
    //         let [fromRow , fromColumn] = gridState.dragStartTokenCoords;
    //         let moveObject =  { fromRow , fromColumn , toRow , toColumn };
    //         handleMoveCallback(moveObject);
    //     }

    //     else {
    //         repositionToken();
    //     }
        
    // }

    // const checkMove = (fromRow , fromColumn , toRow , toColumn) => {


    //     let tileAtFrom  = gridState.tileMap[fromRow][fromColumn];
    //     let tileAtTo  = gridState.tileMap[toRow][toColumn]; 
    //     console.log(`Board.checkMove() areAdjacent() ${areAdjacent(fromRow , fromColumn , toRow , toColumn)}`);
    //     console.log(`Board.checkMove() compatibleContents() ${compatibleContents(tileAtFrom, tileAtTo)}`);
    //    return areAdjacent(fromRow , fromColumn , toRow , toColumn) 
    //           && compatibleContents(tileAtFrom , tileAtTo);
    // }

    // const areAdjacent = (row , column , rowOther , columnOther) => {
        
    //     let rowDifference  =  Math.abs(row - rowOther);
    //     let columnDifference  = Math.abs(column - columnOther);
    //     return (!rowDifference && columnDifference === 1 )
    //            || (!columnDifference && rowDifference === 1);
    // }

    // const compatibleContents =   (tileAtFrom , tileAtTo) =>{
    //     return !["#" , "0"].includes(tileAtFrom) && tileAtTo === "0";    }

    // const repositionToken  =  () => {
    //     console.log("Board.repositionToken()");

    //     setGridState({
    //         ...gridState , 
    //         dragStartTokenCoords : null,
    //         dragToken: null , 
    //         tokenPosition: {x:0 , y: 0}
    //     });
    // }

    // const moveTokenFromTo   =  (grid , startRow , startColumn , endRow , endColumn) => {
    //     let temp  = grid[startRow][startColumn];
    //     grid[startRow][startColumn] =  "0";
    //     grid[endRow][endColumn] = temp;
    // }

    // const showGrid  = grid => {
    //     grid.forEach(row => {
    //         console.log(row.join(""));
    //     })
    // }

    // const moveToken = (endDragRow , endDragColumn) => {
    //     console.log("Board.moveToken()");

    //     let [startRow , startColumn] =  gridState.dragStartTokenCoords;
    //     let resultTileMap = gridState.tileMap.slice();
    //     moveTokenFromTo(resultTileMap, 
    //          startRow , startColumn , endDragRow , endDragColumn);
    //     console.log("resultTileMap");
    //     console.log(resultTileMap);
    //     showGrid(resultTileMap);
    //     setGridState({
    //         ...gridState , 
    //         tileMap : resultTileMap,
    //         dragToken : null,
    //         dragStartTokenCoords : null,
    //         tokenPosition : {x: 0 , y:0}
    //     });

 
    // }

    // const getColumn  = (posX , posY) => {
    //     let boundingBox = gridRef.current.getBoundingClientRect();
    //     let tileWidth  =   boundingBox.width  /  gridColumns;
    //     let tileHeight  = boundingBox.height  / gridRows;
    //     let column  = Math.floor((posX  - boundingBox.x) / tileWidth);

    //     return Math.min(column , gridColumns -  1);
    // }

    // const getRow  = (posX , posY) => {
    //     let boundingBox = gridRef.current.getBoundingClientRect();
    //     // let tileWidth  =   boundingBox.width  /  gridColumns;
    //     let tileHeight  = boundingBox.height  / gridRows;
    //     let row  = Math.floor((posY  - boundingBox.y) / tileHeight);

    //     // console.log(`row ${Math.min(row , gridRows - 1)} `);
    //     return  Math.min(row , gridRows - 1);
    // }


    // const getTokenAt = (row , column) => {
    //     let idx  =  row * gridColumns  +  column;
    //     console.log(`getTokenAt ${row} ${column} : ${contents[idx]}`);
    //     return contents[idx];
    // }

    
   

    // const getGridContents = (gameMap) => {
    //     return gameMap
    //             .flatMap(row => row)
    //             .map((character , idx) => {
    //                 if (isTransparentTile(character)) { return null; }

    //                 let row  = Math.floor(idx  / gridColumns);
    //                 let column  = idx % gridColumns;
    //                 let startCoords  =  gridState.dragStartTokenCoords;
    //                 let draggableToken = startCoords ? 
    //                                     sameGridCoords(startCoords , [row , column]) :
    //                                     true ;
    //                                     console.log("some troubl")
    //                 return <Tile 
    //                             key={idx}
    //                             content={character}
    //                             row={row}
    //                             column={column}
    //                             startDragCallback= {startDrag}
    //                             endDragCallback={endDrag}
    //                             controlDragCallback={controlDrag}
    //                             tokenPosition={gridState.tokenPosition}
    //                             draggableToken={draggableToken}
    //                         />

    //             })
    // }

    // const isTransparentTile = tile => tile === "#";
    // const sameGridCoords  =  ([row , column] , [rowOther , columnOther]) => {
    //     console.log("some trouble");
    //     console.log("some log");
    //     return row === rowOther && column === columnOther;
    // }



    // let [gridState , setGridState] = useState({
    //     tileMap : gameMapUpdate , 
    //     dragToken : null,
    //     dragStartTokenCoords : null,
    //     tokenPosition : {x: 0 , y:0}
    // });
    // let gridRef  = useRef(null);
    // let gridRows  = gameMapUpdate.length;
    // let gridColumns  = gameMapUpdate[0].length;
    // let contents  = getGridContents(gridState.tileMap);
    // let gridStyle = {
    //     gridTemplateRows : "1fr ".repeat(gridRows),
    //     gridTemplateColumns : "1fr ".repeat(gridColumns)
    // }


   
    // return (
    //     <div 
    //         className="board-grid" 
    //         ref={gridRef}
    //         style={{...gridStyle}}>
    //         {contents}
    //     </div>
    // )
}


export default Board;