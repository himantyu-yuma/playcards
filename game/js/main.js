let markerID_1 = null;
let markerID_2 = null;
let markerIDs = [];

let score = 0;
AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;

        // マーカーを検出したイベントの登録
        marker.addEventListener('markerFound', function () {
            // var knight = marker.querySelector(".knight_entity")
            var random = Math.floor( Math.random() * 5 );
            // knight.setAttribute("animation-mixer", `clip: Pose${random}`);
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

