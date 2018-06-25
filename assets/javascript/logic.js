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

// Functions

function clock() {
    dateAndTime = new Date();
    hours = dateAndTime.getHours();
    minutes = dateAndTime.getMinutes();
    $("#hours").text(hours + " :");
    $("#minutes").text(minutes);
    console.log(dateAndTime);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
}

      $("#add-train").on("click", function(event) {
        event.preventDefault();
        
        trainName = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#first-train-input").val().trim();
        frequency = $("#frequency-input").val().trim();

//use .push instead of .set to stop overwriting the info in firebase
        var newTrain = {
            trainName: trainName, 
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        };

        database.ref().push(newTrain);

        console.log(newTrain.trainName);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequency);

        $("#train-name-input").val("");
        $("#destination-input").val("")
        $("#first-train-input").val("");
        $("#frequency-input").val("");

      });

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot);

        var currentTime = moment();

        var tBody = $("tbody");
        var tRow = $("<tr>");

        var trainNameTD = $("<td>").text(childSnapshot.val().trainName);
        var destinationTD = $("<td>").text(childSnapshot.val().destination);
        var frequencyTD = $("<td>").text(childSnapshot.val().frequency);
        var nextTrainTD = $("<td>") //this needs to be next train instead of first train
        var minAwayTD = $("<td>"); // need to add something here to calculate

        tRow.append(trainNameTD, destinationTD, frequencyTD, nextTrainTD, minAwayTD);
        tBody.append(tRow);
        
        }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
        });

        // $("#clear-form").on("click", function(clear) {
        //     $("#train-name-input").empty();
        //     $("#destination-input").empty();
        //     $("#first-train-input").empty();
        //     $("#frequency-input").empty();
        // })


    // Call Functions
        clock();
        setInterval(clock, 1000 * 60);