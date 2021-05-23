const express = require('express')
const fileUpload = require('express-fileupload');
const model = require("../model/ModelRequests")


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
    res.write("searching for" + req.body.key +":\n")
    var key = req.body.key
    
    // Checking if there any files sent
    if (!req.files) {
        req.write('You need to upload the files BEFORE submition.\n');
        res.end();
        return;
    }

    // console.log(req.baseUrl);
    console.log(req);


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

   

        var file = req.files.trainFile //name in html of file
        let jsonString = file.data.toString()
        let jsonString2 = JSONmessege;
        
        
        
        let send = ""
        for (var key in jsonString2) {
            let counter = 1;
            if (jsonString2.hasOwnProperty(key)) {
                 
                let arr = jsonString2[key].toString().split(",");
                send += "Attribute " +key+": \n";
                let check = 0;
                for(var i in arr){
                    if(check === 0){
                        send +=`anomaly number: ${counter} -> from: ${arr[i]} `
                        counter++;
                    }
                    else{
                        send +="to: " + arr[i] +"\n";
                    }
                   check = (check+1)%2            
                }
                send +="\n"

            }
        }
        
    res.write(send)
    res.end()
} )

app.listen(8080)







