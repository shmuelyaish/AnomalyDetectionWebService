const express = require('express')
const fileUpload = require('express-fileupload');
const model = require("../model/ModelRequests")
const view = require("../view/view.js");

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

const LINEAR_ALGOIRTHM_ID = 1;
const HYBRID_ALGOIRTHM_ID = 2;

app.post('/detect', (req, res) => {

    // Checking if there any files sent
    if (!req.files) {
        req.write('You need to upload the files BEFORE submition.\n');
        res.end();
        return;
    }

    const trainigFile = req.files.trainFile;
    const testingFile = req.files.testFile;

    let messege;
    
    if (req.body.AlgorithmType == LINEAR_ALGOIRTHM_ID) {
        messege = model.simpleAnomaly(trainigFile.data.toString(), testingFile.data.toString());
    } else {
        messege = model.hybridAnomaly(trainigFile.data.toString(), testingFile.data.toString());
    }

    console.log(messege);
    // console.log(trainigFile);
    let JSONmessege = {};
   
    function mapToObj(map){
        const obj = {}
        for (let [k,v] of map)
          obj[k] = v
        return obj
    }

    JSONmessege = mapToObj(messege);

    res.send(JSON.stringify(JSONmessege));    

    res.end();
});


app.post("/detectTrusted",(req,res)=>{
    
    res.write("List of Exceptions")
    var key = req.body.key
    
    // Checking if there any files sent
    if (!req.files) {
        res.write('You need to upload the files BEFORE submition.\n');
        res.end();
        return;
    }

   

    const trainigFile = req.files.trainFile;
    const testingFile = req.files.testFile;

    let messege;
    
    if (req.body.AlgorithmType == LINEAR_ALGOIRTHM_ID) {
        messege = model.simpleAnomaly(trainigFile.data.toString(), testingFile.data.toString());
    } else {
        messege = model.hybridAnomaly(trainigFile.data.toString(), testingFile.data.toString());
    }

  
    
    let JSONmessege = {};
   
    function mapToObj(map){
        const obj = {}
        for (let [k,v] of map)
          obj[k] = v
        return obj
    }

    JSONmessege = mapToObj(messege);
    
    view.edit(res ,JSONmessege);
    

} )

app.listen(8080)







