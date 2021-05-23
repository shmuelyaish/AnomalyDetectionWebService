# AnomalyDetectionWebService
Authors: Shmuel Yaish, Elad Bilman, Yedidya Bachar.
This project is for our university course Advanced Programming 2.

Introduction:
  We created a server that offers an Anomaly Detection Services. The user uploads a .csv file that the module
  learns from, and another .csv (with anomalies) for the program to detect. 
 
How to use:
  1. Choose the Linear or Hybrid anomaly detection algorithm. 
  2. Upload a .csv file that the program will learn from in the right box. (!NOTE! : The csv must be of Unix endline format '\n') 
  3. Upload a .csv file that for the program to detect in the right box.
  4. Press Submit.
  5. ....
  6. Profit.

How to setup the server on your computer:
  1. First you will need to download the github repo.
  2. Extract the "AnomalyDetectionServerProjectCompressed.zip" file.
  3. Open cmd so that you are in AnomalyDetectionServerProjectCompressed project working directory.
  4. Run the command: node controller/expServer.js
  5. The server is up! Done. 

What you need in order to edit/run the server:
  1. Node.js
    Download Link: https://nodejs.org/en/download/
  2. Add to your working enviroment by using npm:
    Type this commands to download:
      - npm install express --save
      - npm install small-enclosing-circle
  NOTE:
    - We included .csv files in the model dir for easier testing. 

How to connet:
  1. By "localhost":
    - Open your favorite browser and type the url: "http://localhost:8080/"
  2. By "Client":
    - By creating your own .html client page and sending HTTP requests.
    - In the HTTP POST request for learning (submit button), the name of the files in the request body
      must be called: trainFile for the learning file, testFile for the detection file. 
