import React from "react";

export function BoardUpdate({boardMap , rows , columns , isInteractive}){
    useEffect(
        () => { 
            const {top, right, bottom, left, width, height, x, y} = gridRef.current.getBoundingClientRect();
            let boundingBox = {top, right, bottom, left, width, height, x, y};
            gridRef.current && dispatch(setGridRef(boundingBox)) 
        } , 
        [gridRef]
    )

    let contents  =  flatGameMap.map( (tile , idx) => {
        if (isTransparentTile(tile)) { return null; }

        // console.log(`Board.contents() tile ${tile}`); 
        // console.log(tileHasToken(tile));
        let column  =  idx % boardColumns;
        let row  =  Math.floor(idx / boardRows);
        let token = tileHasToken(tile) ? 
                    <Token isInteractive={isInteractive} color={getTokenColor(tile)} id={idx} /> : 
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
   
}