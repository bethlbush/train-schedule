// Initialize Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDyN4SEKKxH9L165fCsH6WQHnBA_pjGUsI",
    authDomain: "train-schedule-e298b.firebaseapp.com",
    databaseURL: "https://train-schedule-e298b.firebaseio.com",
    storageBucket: "train-schedule-e298b.appspot.com",
    messagingSenderId: "195380481871"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
var trainName = "";
var dest = "";
var firstTrain = 0;
var freq = 0;
var nextArrival = 0;
var minAway = 0;
var dateAdded = 0;

// Capture Button Click
$("#submitButton").on("click", function(event) {
    event.preventDefault();

    //get value of input and trim extra spaces
    trainName = $("#trainName").val().trim();
    dest = $("#dest").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    freq = $("#freq").val().trim();

    // Push to Firebase
    dataRef.ref().push({

        trainName: trainName,
        dest: dest,
        firstTrain: firstTrain,
        freq: freq,
        nextArrival: nextArrival,
        minAway: minAway,
        dataAdded: firebase.database.ServerValue.TIMESTAMP

    });
    //clear the form
    $("#trainName").val("");
    $("#dest").val("");
    $("#firstTrain").val("");
    $("#freq").val("");
});

// Firebase watcher + initial loader 
dataRef.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().dest);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().freq);
    console.log(childSnapshot.val().nextArrival);
    console.log(childSnapshot.val().minAway);


    $("#trainTable").append(
        "<tr>" +
        "<td>" + childSnapshot.val().trainName + "</td>" +
        "<td>" + childSnapshot.val().dest + "</td>" +
        "<td>" + childSnapshot.val().freq + "</td>" +
        "<tr>"
    );


    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    


