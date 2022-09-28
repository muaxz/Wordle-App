import React, { useEffect, useState } from 'react';
import "../styles/Square/square.css"

export default function Square({onChangeHandler,inputRef,index,colorType}){

    var squareAnimation = ""

    if(colorType === "GREEN"){
        squareAnimation = "green"
    }else if(colorType === "YELLOW"){
        squareAnimation = "yellow"
    }else{
        squareAnimation = ""
    }
    
    return(
        <div className="square_outer">
            <input className={`square_input ${squareAnimation}`} style={{textTransform:"capitalize",pointerEvents:"none",animationDelay:`${(index%10)*50}ms`}} onChange={(e)=>onChangeHandler(e,index)} ref={inputRef} ></input>
        </div>
    )
}