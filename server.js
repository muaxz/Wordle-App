const express = require("express")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.static("public"))

app.get("*",(req,res,next)=>{
  res.sendFile(path.resolve(__dirname,"../public","index.html"))
  //res.sendFile(path.resolve(__dirname,"public","index.html"))
})


app.listen(PORT,()=>{console.log("listening...")})