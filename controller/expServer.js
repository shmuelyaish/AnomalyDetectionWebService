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

/*
app.post("/detect",(req,res)=>{
    res.write("searching for" + req.body.key +":\n")
    var key = req.body.key
    if(req.files){
        var file = req.files.text_file //name in html of file
        console.log(file)
        //file.data
        var result = model.searchText(key,file.data.toString())
        res.write(result)
    }
    res.end()
} )*/


app.post("/detect",(req,res)=>{
    res.write("searching for" + req.body.key +":\n")
    var key = req.body.key
    if(req.files){
        var file = req.files.trainFile //name in html of file
        let jsonString = file.data.toString()
        let jsonString2 = JSON.parse(jsonString)
        //file.data
        //var personJSONString=JSON.stringify(file.data.toString())
        //var jsonString = '{"some":"json"}';
        //var temp = '{"0":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"1":[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,00,0,0,0,0,0,0,0]}'
        //var jsonString2=JSON.parse(file.data.JSON)

        let send = ""
        for (var key in jsonString2) {
            if (jsonString2.hasOwnProperty(key)) {
                send += 'List of anomalies in feature ' +key + "\n" + jsonString2[key]+"\n";
            }
        }
        

       /* var jsonreal = JSON.stringify(jsonString.data.toString())
        var jsonPretty = JSON.stringify(JSON.parse(jsonString),null,2);  
        
        var json = jsonreal.items
        var fields = Object.keys(json[0])
        var replacer = function(key, value) { return value === null ? '' : value } 
        var csv = json.map(function(row){
        return fields.map(function(fieldName){
            return JSON.stringify(row[fieldName], replacer)
        }).join(',')
        })
        csv.unshift(fields.join(',')) // add header column
        csv = csv.join('\r\n');
        
        
        
        var result1 = file.data.toString()*/
        res.write(send)
    }
    res.end()
} )

app.listen(8080)







