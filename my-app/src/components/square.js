import React, { useEffect, useState } from 'react';
import "../styles/Square/square.css"

export default function Square({onChangeHandler,inputRef,index,colorType,duration}){

    var squareAnimation = ""

    if(colorType === "GREEN"){
        squareAnimation = "green"
    }else if(colorType === "YELLOW"){
        squareAnimation = "yellow"
    }else if(colorType === "BLACK"){
        squareAnimation = "black"
    }else if(colorType === "RED"){
        squareAnimation = "red"
    }
    
    return(
        <div className="square_outer">
            <input className={`square_input ${squareAnimation}`} style={{textTransform:"capitalize",pointerEvents:"none",animationDelay:`${duration*50}ms`}} onChange={(e)=>onChangeHandler(e,index)} ref={inputRef} ></input>
        </div>
    )
}