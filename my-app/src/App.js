import React,{useEffect, useRef,useState} from "react"
import "./styles/app.css";
import Square from "./components/square";
//asdasdasd
function App() {

   const [squareList,setSquareList] = useState([])
   const wordList = useRef(["which","there","their","about"])

   useEffect(()=>{
      const List = [...squareList]
      for (let i = 0; i < 30; i++) {
          List[i] = React.createRef()
      }
      setSquareList(List)
   },[])

 

   const onChangeHandler=(e,index)=>{
      squareList[index+1].current.focus()
   }

   return (
    <div className="head_div">
        <div className="outer_div">
           <div className="inner_div">
                {squareList.map((item,index)=>{
                    return (<Square key={index} inputRef={item} index={index} onChangeHandler={onChangeHandler} ></Square>)
                })}
           </div>
           <div className="button_holder">
               <button className="show_button">Show</button>
           </div>
        </div>
    </div>
  );
}

export default App;
