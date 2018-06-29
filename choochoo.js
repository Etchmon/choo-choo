var config = {
    apiKey: "AIzaSyAgB-WfG_9p10fvUw40LGrLCPYfV8tza_8",
    authDomain: "fir-beginnings-2684c.firebaseapp.com",
    databaseURL: "https://fir-beginnings-2684c.firebaseio.com",
    projectId: "fir-beginnings-2684c",
    storageBucket: "fir-beginnings-2684c.appspot.com",
    messagingSenderId: "607567457325"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function () {

    event.preventDefault();

    var tName = $("#train-name").val();
    var destination = $("#destination").val();
    var firstTrain = $("#first-train").val();
    var frequency = $("#frequency").val();;
    var firstTimeFormat = moment(firstTrain, "hh:mm").format("HH:mm A");
    console.log(firstTimeFormat);
    var timeDiff = moment().diff(moment(firstTimeFormat, "HH:mm"), "minutes");
    var remainder = timeDiff % frequency;
    var minutesTillTrain = frequency - remainder;
    console.log(minutesTillTrain);
    var nextTrain = moment().add(minutesTillTrain , "minutes").format("HH:mm A");
    console.log(nextTrain);



    database.ref().push({
        TrainName: tName,
        Destination: destination,
        FirstTrain: firstTrain,
        Frequency: frequency,
        NextTrain: nextTrain,
        MinutesTill: minutesTillTrain,

    })

    $("input").val("");

});

database.ref().on("child_added", function (snapshot) {
    var newTrain = "<tr>" + "<td>" + snapshot.val().TrainName + "<td>" + snapshot.val().Destination + "<td>" + snapshot.val().Frequency + "<td>" + snapshot.val().NextTrain + "<td>" + snapshot.val().MinutesTill;
    $("tbody").append(newTrain);

})