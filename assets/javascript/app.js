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
    
    var trainTimeConverted;
    var minutesAway;

    // End Global Variables

    // Submit button click function
    $("#submitBtn").on("click", function(evt){
        evt.preventDefault();
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        trainTime = $("#time").val().trim();
        frequency = $("#frequency").val().trim();
        console.log(trainName, destination, trainTime, frequency);

        // Calculating "Next Arrival" and "Minutes Avay"
        trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
        currentTime = moment();
        diffTime = moment().diff(moment(trainTimeConverted), "minutes");
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

        // Place user inputs into the table
        // Creates new td tags to place user inputs in
        var tableBody = $("tbody");
        var tableRow = $("<tr>");
        // td will be our cells
        var tdTrainName = $("<td>").text(trainName)
        var tdDestination = $("<td>").text(destination)
        var tdTime = $("<td>").text(trainTime)
        var tdFrequency = $("<td>").text(frequency)
        tableRow.append(tdTrainName, tdDestination, tdFrequency, tdTime );
        tableBody.append(tableRow);
    })

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
        console.log(snapshot.val());
        // Create a new date object
        newStartDate = new Date(snapshot.val().StartDate);
        monthsWorked = diff_months(newStartDate)
        totalBilled = monthsWorked * snapshot.val().MonthlyRate;

    })
})