var config = {
    apiKey: "AIzaSyA2_5NW2QXnoGo_u8YLhJiCCkmcGB-gBTA",
    authDomain: "fir-setup-3d046.firebaseapp.com",
    databaseURL: "https://fir-setup-3d046.firebaseio.com",
    projectId: "fir-setup-3d046",
    storageBucket: "fir-setup-3d046.appspot.com",
    messagingSenderId: "373751126793"
};
firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();

$("#trainAdd").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $('#firstTrainTime').val().trim();
    var frequency = $('#frequency').val().trim();

    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract("1, years");
    var difference = currentTime.diff(moment(firstTimeConverted), "minutes");
    var remainder = difference % frequency;
    var minutesAway = frequency - remainder;
    var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm a");

    console.log(minutesAway);

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        minutesAway: minutesAway,
        nextArrival: nextTrain
    }

    database.ref().push(newTrain);

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

});

$('#timeSubmit').on('click', function () {
    var $time2Convert = $('#userTime').val().trim();
    var $displayConverted = $('#timeDisplay');

    var userTime = moment($time2Convert, "hh:mm a").subtract("1, years");

    var nonMilitaryTime = moment(userTime).format("HH:mm");

    $displayConverted.text(nonMilitaryTime);

    $('#userTime').val('');
})

database.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrainTime = snapshot.val().firstTrainTime;
    var nextArrival = snapshot.val().nextArrival;
    var minutesAway = snapshot.val().minutesAway;

    var militaryTime = moment(firstTrainTime, 'HH:mm a').subtract("1, years");
    var nonMilitaryTime = moment(militaryTime).format('hh:mm a');

    var $trainTable = $('#trainData');
    $trainTable.addClass('tbody');

    var $trainRow = $('<tr>');

    var $nameofTrain = $('<td>');
    $nameofTrain.text(name);

    var $trainDestination = $('<td>');
    $trainDestination.text(destination);

    var $frequency = $('<td>');
    $frequency.attr('id', 'frequencyMinutes');
    $frequency.text(frequency);

    var $firstTrainTime = $('<td>');
    $firstTrainTime.text(nonMilitaryTime);

    var $nextTrainTime = $('<td>');
    $nextTrainTime.text(nextArrival);

    var $minutesAway = $('<td>');
    $minutesAway.text(minutesAway);

    $trainRow.append($nameofTrain, $trainDestination, $frequency, $firstTrainTime, $nextTrainTime, $minutesAway);
    $trainTable.append($trainRow);

});




