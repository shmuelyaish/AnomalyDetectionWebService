


function edit(res, JSONmessege){

    let jsonString2 = JSONmessege;

    let send = ""
    for (var key in jsonString2) {
        let counter = 1;
        if (jsonString2.hasOwnProperty(key)) {
                
            let arr = jsonString2[key].toString().split(",");
            send += "Attributes " +key+": \n";
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
    return
} 
module.exports = { edit };
