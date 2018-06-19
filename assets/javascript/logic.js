// Initialize Firebase

var config = {
    apiKey: "AIzaSyB0Hx8sAkCAKi0y592XUDZ5oqAhZmcZkk0",
    authDomain: "train-scheduler-74c6f.firebaseapp.com",
    databaseURL: "https://train-scheduler-74c6f.firebaseio.com",
    projectId: "train-scheduler-74c6f",
    storageBucket: "train-scheduler-74c6f.appspot.com",
    messagingSenderId: "865679610687"
  };

  firebase.initializeApp(config);

  // Global Variables

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency ="";

  var realTime = 

// Functions

      $("#add-train").on("click", function(event) {
        event.preventDefault();
        
        trainName = $("#train-name-input").val();
        destination = $("#destination-input").val();
        firstTrain = $("#first-train-input").val();
        frequency = $("#frequency-input").val();
        database.ref().set({
          trainName: trainName, 
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
        });
      });

    database.ref().on("value", function(snapshot) {
        console.log(snapshot.val().trainName);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().firstTrain);
        console.log(snapshot.val().frequency);

        var tBody = $("tbody");
        var tRow = $("<tr>");

        var trainNameTD = $("<td>").text(snapshot.val().trainName);
        var destinationTD = $("<td>").text(snapshot.val().destination);
        var firstTrainTD = $("<td>").text(snapshot.val().firstTrain);
        var frequencyTD = $("<td>").text(snapshot.val().frequency);
        var minAwayTD = $("<td>");

        tRow.append(trainNameTD, destinationTD, firstTrainTD, frequencyTD, minAwayTD);
        tBody.append(tRow);
        

        // Create Error Handling
        }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
        });

