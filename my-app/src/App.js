import React,{useEffect, useRef,useState} from "react"
import "./styles/app.css";
import Square from "./components/square";
import InfoWindow from "./components/informWindow";
import txtFile from  "./five-letter-words.txt"
//asdasdasd
function App() {

   const [squareList,setSquareList] = useState([])
   const oneTimeFocus = useRef(true)
   const [currentRow,setCurrentRow] = useState(0)
   const [isWin,setIsWin] = useState("")
   const [message,setMessage] = useState("")
   const [wordExist,setWordExist] = useState(true)
   const wordList = useRef([])
   const randomNumber = useRef(0)
   
   useEffect(()=>{
      randomNumber.current = Math.floor(Math.random() * (3000 - 0 + 1) + 0);
   
      fetch(txtFile).then((res)=>res.text()).then((res)=>{
          wordList.current = res.split(/\r?\n/);
      })

      const List = [...squareList]
      var durationCounter = 0;
      for (let i = 0; i < 30; i++) {
          durationCounter++;  
          if((i % 5) === 0){
             durationCounter = 0;
          }
          List[i] = {ref:React.createRef(),colorType:"",animationDuration:durationCounter}
      }
      setSquareList(List)

   },[])

   useEffect(()=>{

      if(squareList.length && oneTimeFocus.current){
         squareList[0].ref.current.focus()
         oneTimeFocus.current = false;
      }  

   },[squareList])
   console.log(wordList.current[randomNumber.current])
   
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
      
         const selectedMessage = wordList.current[randomNumber.current];
         
         const squareListCopy = [...squareList]
         var equalityCounter = 0;
         var doesWordExist = false;
         for (let i = 0; i < wordList.current.length; i++){
            if(message === wordList.current[i]){
               doesWordExist = true;
               break;
            }
            
         }

         if(!doesWordExist){

            for (let i = 0; i < message.length; i++){
               squareListCopy[(currentRow-4)+i].colorType = "RED";
            }
          
            setSquareList(squareListCopy);
            setWordExist(false)
            setMessage("")
            squareList[currentRow+1].ref.current.focus()
            return;
         }
         
         for (let i = 0; i < message.length; i++) {
           
            if(selectedMessage[i] === message[i]){
                squareListCopy[(currentRow-4)+i].colorType = "GREEN"
                equalityCounter++
            }

         }
         
         if(equalityCounter === 5){
             setSquareList(squareListCopy)
             setTimeout(() => {
                setIsWin("win")
             },1000);
             return;
         }

        
         for (let i = 0; i < selectedMessage.length; i++){
            
             var letterCheckCounter = 0;
             for (let j = 0; j < message.length; j++) {
                //console.log(selectedMessage[i]+": "+i)
                //console.log( message[j]+": "+j)
                if(selectedMessage[j] === message[i] && i !== j){

                    if(squareListCopy[(currentRow-4)+i].colorType === ""){

                      squareListCopy[(currentRow-4)+i].colorType = "YELLOW"

                    }

                }else if(selectedMessage[j] !== message[i]){

                  letterCheckCounter++

                }
                
                if(letterCheckCounter === 5){
                  squareListCopy[(currentRow-4)+i].colorType = "BLACK"
               }
             }
         }
         
         if(currentRow === 29){
             setIsWin("lose")
         }

         setSquareList(squareListCopy)
         setMessage("")
         squareList[currentRow+1].ref.current.focus()
   }

   return (
    <div className="header_div">
        {isWin === "win" && <InfoWindow closeWindowHandler={()=>setIsWin("")}>You Prediction is correct,<br></br>Congratulations!</InfoWindow>}
        {isWin === "lose" && <InfoWindow closeWindowHandler={()=>setIsWin("")}>The word was "{wordList.current[randomNumber.current]}"<br></br><br></br>:(</InfoWindow>}
        <div className="outer_div">
           <h1 style={{zIndex:"20"}}>WORDLE</h1>
           {!wordExist ? <p style={{textAlign:"center"}}>NOT IN THE WORD LIST</p> : ""}
           <div className="inner_div">
                {squareList.map((item,index)=>{
                    return (<Square key={index} colorType={item.colorType} inputRef={item.ref} index={index} duration={item.animationDuration} onChangeHandler={onChangeHandler} ></Square>)
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
