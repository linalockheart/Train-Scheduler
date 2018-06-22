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
    var currentTime = //need to figure out how to get current time to calculte minutes away
//does this need to wrap around everything so I can reference the local variables?

      $("#add-train").on("click", function(event) {
        event.preventDefault();
        
        trainName = $("#train-name-input").val();
        destination = $("#destination-input").val();
        firstTrain = $("#first-train-input").val();
        frequency = $("#frequency-input").val();

//use .push instead of .set to stop overwriting the info in firebase
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
        var minAwayTD = $("<td>"); // need to add something here to calculate

        tRow.append(trainNameTD, destinationTD, firstTrainTD, frequencyTD, minAwayTD);
        tBody.append(tRow);
        
        }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
        });

        $("#clear-form").on("click", function(clear) {
            $("#train-name-input").empty();
            $("#destination-input").empty();
            $("#first-train-input").empty();
            $("#frequency-input").empty();
        })


    // Call Functions
        clock();
        setInterval(clock, 1000 * 60);