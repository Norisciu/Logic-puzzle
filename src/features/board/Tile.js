import React, { useRef } from "react";
import Token from "./Token";
// import { useDrag, useDrop } from "react-dnd";

// console.log("some thng");
// const EMPTY_CHARACTER =  "0";
// const colorsMap  =  new Map([["r" , "red"] , ["b" , "blue"], ["S" , "square"]]);
// const isEmptyContent  =  (character) => {
//     return character  === EMPTY_CHARACTER;
// }

// const getColor  = character => {
//     return colorsMap.get(character);
// }

const Tile  =  ({ row , column  , children}) => {


    let style={
        gridArea : `${row+1} / ${column+1} / ${row + 2} / ${column + 2}`
    };

    return (
        <div  className="grid-tile" style={{...style}} >
            {children}
        </div>
    );
    
}

export default Tile;