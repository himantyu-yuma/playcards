var db = firebase.firestore();

function addTest() {
    db.collection("test").add({
        comments: "マイメロ"
    })
        .then((doc) => {
            console.log(`追加に成功しました (${doc.id})`);
        })
        .catch((error) => {
            console.log(`追加に失敗しました (${error})`);
        });

}