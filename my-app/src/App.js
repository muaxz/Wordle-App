import React,{useEffect, useRef,useState} from "react"
import "./styles/app.css";
import Square from "./components/square";
import InfoWindow from "./components/informWindow";
//asdasdasd
function App() {

   const [squareList,setSquareList] = useState([])
   const oneTimeFocus = useRef(true)
   const [currentRow,setCurrentRow] = useState(0)
   const [isWin,setIsWin] = useState(false)
   const [message,setMessage] = useState("")
   const wordList = useRef(["which","there","their","about"])

   useEffect(()=>{

      const List = [...squareList]
      for (let i = 0; i < 30; i++) {
          List[i] = {ref:React.createRef(),colorType:""}
      }
      setSquareList(List)

   },[])

   useEffect(()=>{

      if(squareList.length && oneTimeFocus.current){
         squareList[0].ref.current.focus()
         oneTimeFocus.current = false;
      }  

   },[squareList])
 
   
   const onChangeHandler=(e,index)=>{
      
      let stateMessage = message;
      stateMessage += e.target.value;
      setMessage(stateMessage)

      if((index+1) % 5 == 0){
         setCurrentRow(index)
         squareList[index].ref.current.disabled = true
         return;
      }
    
      squareList[index+1].ref.current.focus()
   }

   const handleValidationProcess=()=>{
       
         const selectedMessage = wordList.current[3];
         const squareListCopy = [...squareList]
         var equalityCounter = 0;
         for (let i = 0; i < message.length; i++) {
           
            if(selectedMessage[i] === message[i]){
                squareListCopy[(currentRow-4)+i].colorType = "GREEN"
                equalityCounter++
            }

         }

         for (let i = 0; i < message.length; i++){
             for (let j = 0; j < message.length; j++) {
                console.log(selectedMessage[i]+": "+i)
                console.log( message[j]+": "+j)
                if(selectedMessage[i] === message[j] && i !== j){
                    console.log("inside inner loop")
                    squareListCopy[(currentRow-4)+i].colorType = "YELLOW"
                }
             }
         }
         
         if(equalityCounter === 5){
             setTimeout(() => {
                setIsWin(true)
             },1000);
         }

         setSquareList(squareListCopy)
         setMessage("")
         squareList[currentRow+1].ref.current.focus()
   }

   return (
    <div className="head_div">
        {isWin && <InfoWindow>You Prediction is correct,<br></br>Congratulations!</InfoWindow>}
        <div className="outer_div">
           <div className="inner_div">
                {squareList.map((item,index)=>{
                    return (<Square key={index} colorType={item.colorType} inputRef={item.ref} index={index} onChangeHandler={onChangeHandler} ></Square>)
                })}
           </div>
           <div className="button_holder">
               <button disabled={(currentRow+1) % 5 == 0 ? false : true} onClick={handleValidationProcess} className="show_button">Show</button>
           </div>
        </div>
    </div>
  );
}

export default App;
