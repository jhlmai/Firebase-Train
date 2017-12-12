var config = {
    apiKey: "AIzaSyBe_fQcm5m7qOrOK053j2hjpf1RRRUJors",
    authDomain: "fir-train-172ba.firebaseapp.com",
    databaseURL: "https://fir-train-172ba.firebaseio.com",
    projectId: "fir-train-172ba",
    storageBucket: "",
    messagingSenderId: "930485159817"
};
firebase.initializeApp(config);
var database = firebase.database();


$("#search-btn").on("click", function (event) {
    event.preventDefault();


    var trainName = ($("#name").val());

    var destinationData = ($("#destination").val());

    var firstTrain = ($("#first-train").val());

    var tFrequency = ($("#frequency").val());

    // Time is 3:30 AM
    // var firstTrain = parseInt($("#first-train").val());

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



    database.ref().push({
        trainName: trainName,
        destination: destinationData,
        firstTrain: firstTrain,
        tFrequency: tFrequency,
        nextTrain: nextTrain,

    });

});

database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().tFrequency);
    // console.log(childSnapshot.val().nextTrain);

    var row = $("<tr>");
    row.append("<td id='trainName_'> " + childSnapshot.val().trainName +
        " </td><td id = 'destination_'> " + childSnapshot.val().destination +
        " </td><td id = 'tFrequency'> " + childSnapshot.val().tFrequency +
        " </td><td id = 'nextTrain'> " + childSnapshot.val().nextTrain +
        " </td><td id = 'tMinutesTillTrain'> " + childSnapshot.val().tMinutesTillTrain + " </td>");
    $("#tableBody").append(row);

    //   var monthsWorked = moment().diff(moment.unix(parseInt(childSnapshot.val().firstTrain), "X"), "months");
    //   console.log(monthsWorked);

});
