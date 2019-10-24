var config = {
    apiKey: "AIzaSyCH6glNgntRPryK8O7RGbaKJfOLCJKPHqM",
    authDomain: "train-scheduler-cbb84.firebaseapp.com",
    databaseURL: "https://train-scheduler-cbb84.firebaseio.com",
    projectId: "train-scheduler-cbb84",
    storageBucket: "train-scheduler-cbb84.appspot.com",
    messagingSenderId: "261139447095",
    appId: "1:261139447095:web:71ca842805273f7e2f2eb2"
  };

firebase.initializeApp(config);

var database = firebase.database();

var name;
var destination;

var frequency;



$("#submit-button").on("click", function(event){
    event.preventDefault();


    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
    frequency = $("#frequency-input").val().trim();




    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

        

    });

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    console.log();
});

//the above code works

database.ref().on("child_added", function(snapshot){
    var sv = snapshot.val();

    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.time);
    console.log(sv.frequency);

    var firstTimeConverted = moment(sv.time, "HH:mm").subtract(1, "years");
    

    var currentTime = moment();
    

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    

    var tRemainder = diffTime % sv.frequency;
    

    var tMinutesTillTrain = sv.frequency - tRemainder;
   

    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    



    $(".table").append("<tr><td>" + sv.name + "</td><td>" + sv.destination + "</td><td>" +
    sv.frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");


}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    });






