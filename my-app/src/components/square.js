import React from 'react';
import "../styles/Square/square.css"

export default function Square({onChangeHandler,inputRef,index}){
    return(
        <div className="square_outer">
            <input style={{textTransform:"capitalize"}} onChange={(e)=>onChangeHandler(e,index)} ref={inputRef} className="square_input"></input>
        </div>
    )
}