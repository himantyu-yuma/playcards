let q = window.location.search.slice(1).split("&");
let roomName = decodeURI(q[0].split("=")[1]);
let userName = decodeURI(q[1].split("=")[1]);

let markerIDs = [];

let score = 0;

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

AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;

        // マーカーを検出したイベントの登録
        marker.addEventListener('markerFound', function () {
            var knight = marker.querySelector(".knight_entity");
            if(knight){
                var random = Math.floor( Math.random() * 5 );
                knight.setAttribute("animation-mixer", `clip: Pose${random}`);
            }
            markerIDs.push(marker.id);
            if (markerIDs.length >= 3) {
                check(markerIDs);
            }

            console.log('markerFound', markerIDs);
        });

        // マーカーを見失ったイベントの登録
        marker.addEventListener('markerLost', function () {
            markerIDs.splice(markerIDs.indexOf(marker.id));
            console.log('markerLost', markerIDs);
        });
    }
});

function check(cards) {
    let nums = [];
    for (let i = 0; i < cards.length; i++) {
        const element = cards[i];
        if (!isNaN(element)) {
            nums.push(element);
        }
    }
    if (nums.length != 2) {
        return;
    } else if (nums[0] == nums[1]) {
        score += 10;
        document.getElementById("score").innerText = score;
    }
}

function endGame(){
    updateScore(roomName, userName, score);
    location.href = `result.html?room=${roomName}`;
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
;