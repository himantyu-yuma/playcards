// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAps7NR45H-gOJeBPHtCoUSAb5SxWRwh9o",
    authDomain: "firestore-test-2b3ab.firebaseapp.com",
    databaseURL: "https://firestore-test-2b3ab.firebaseio.com",
    projectId: "firestore-test-2b3ab",
    storageBucket: "firestore-test-2b3ab.appspot.com",
    messagingSenderId: "842637115117",
    appId: "1:842637115117:web:64bd5854f87d17376dd6e4",
    measurementId: "G-W3NT8XHWEQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();

function getFormValue() {
    let roomName = document.getElementById("room_name").value;
    let userName = document.getElementById("user_name").value;
    console.log(roomName);
    console.log(userName);
    accessDB(roomName, userName);
}
function accessDB(roomName, userName) {
    db.collection(roomName).doc(userName).set({
        score: 0
    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

}

function updateScore(roomName, userName, score) {
    db.collection(roomName).doc(userName).set({
        score: score
    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}
