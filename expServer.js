const express = require('express')
const fileUpload = require('express-fileupload');
const model = require("../model/SearchInFile")

const app = express()
app.use(express.urlencoded({
    extended: false //tag 2 values
}))
/*
app.get()
app.post()
app.put()
app.delete()
*/
app.use(fileUpload())
app.use(express.static("../view"))

app.get("/" , (req,res)=>{
    res.sendFile("./index.html")
})


app.post("/search",(req,res)=>{
    res.write("searching for" + req.body.key +":\n")
    var key = req.body.key
    if(req.files){
       
        var file = req.files.text_file //name in html of file
        //file.data
        
        var text = file.data.toString()
        var result =''
        text.split("\n").forEach(row => {
           
                result+=row+"\n"
        });
        
        
        res.write(result)
        
    }
    res.end()
} )

app.listen(8080)







