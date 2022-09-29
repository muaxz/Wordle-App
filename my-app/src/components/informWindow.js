import React from 'react';
import "../styles/infoWindow/info.css"

export default function InfoWindow({children,closeWindowHandler}){
    
    return(
       <div>
           <div onClick={closeWindowHandler} className="black_background"></div>
           <div className="outer_window">
                <div className="text_section">
                    <p>{children}</p>
                </div>
            </div>
       </div> 
    )

}