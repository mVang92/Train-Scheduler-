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
    
    // End Global Variables
})