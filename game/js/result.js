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

let q = window.location.search.slice(1);
let roomName = decodeURI(q.split("=")[1]);

score = [];
player = [];
db.collection(roomName).get().then(function (querySnapshot) {
    let score = [];
    let player = [];
    querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        data = doc.data();
        score.push(data.score);
        userId = doc.id;
        player.push(userId);
    });
    let topScore = 0;
    let topUser = "";
    for (let i = 0; i < score.length; i++) {
        if (topScore >= score[i]) {
            topUser = player[i];
        }
    }
    document.getElementById("win").innerText = topUser;
    console.log(topUser);
});
