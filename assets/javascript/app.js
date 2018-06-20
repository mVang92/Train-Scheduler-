$(document).ready(function(){
    // Firebase database
    var config = {
        apiKey: "AIzaSyBldXU8FdmwlOwxu-OJ0GlpO3dCOsbBsj4",
        authDomain: "assignment-7-train-sched-ee601.firebaseapp.com",
        databaseURL: "https://assignment-7-train-sched-ee601.firebaseio.com",
        projectId: "assignment-7-train-sched-ee601",
        storageBucket: "",
        messagingSenderId: "498660341860"
      };

    firebase.initializeApp(config);

    var database = firebase.database();

    // Global Variables
    var trainName;
    var destination;
    var trainTime;
    var frequency;
    var minutesAway;

    // End Global Variables

    $("#submitBtn").on("click", function(evt){
        evt.preventDefault();
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        trainTime = $("#time").val().trim();
        frequency = $("#frequency").val().trim();
        // console.log(trainName)
        // console.log(destination)
        // console.log(trainTime)
        // console.log(frequency)

        // Calculating "Next Arrival" and "Minutes Avay"
        firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
        currentTime = moment();
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        tRemainder = diffTime % frequency;
        minutesAway = frequency - tRemainder;
        nextTrain = moment().add(minutesAway, "minutes");
        nextTrainFormatted = moment(nextTrain).format("hh:mm A");

        // Pushing the values to the database
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: trainName,
            frequency: frequency,
            nextTrainFormatted: nextTrainFormatted,
            minutesAway: minutesAway
        })
    })
})