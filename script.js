/**************************************************************
 **************************************************************
 **                                                          **
 ** script.js is where you will write most of your code.     **
 **                                                          **
 **************************************************************
 **************************************************************/

const HTML_OUTPUT = document.getElementById("databaseOutput");

/**************************************************************/
// helloWorld()
// Demonstrate a minimal write to firebase
// This function replaces the entire database with the message "Hello World"
// 
// This uses the set() operation to write the key:value pair "message":"Hello World"
// The ref('/') part tells the operation to write to the base level of the database "/"
// This means it replaces the whole database with message:Hello World
/**************************************************************/

firebase.auth().onAuthStateChanged(async function(user){

    if(user){

        document.getElementById("loggedOutNav").style.display = "none";
        document.getElementById("loggedInNav").style.display = "flex";

        document.getElementById("navPfp").src = user.photoURL;

        const snapshot = await firebase.database()
            .ref("userInfo/" + user.uid)
            .once("value");

        if(!snapshot.exists()){

            window.location.href = "login.html";

        }

    }
    else{

        document.getElementById("loggedOutNav").style.display = "block";
        document.getElementById("loggedInNav").style.display = "none";

    }

});

function fb_logOut() {

    firebase.auth().signOut().then(function(){

        window.location.href = "index.html";

    });

}

function loadLeaderboard(databaseName, outputID) {

  let leaderboardHTML = "<ol>";

  firebase.database()
      .ref(databaseName)
      .orderByChild("score")
      .limitToLast(10)
      .once("value", function(snapshot) {

          let results = [];

          snapshot.forEach(function(child) {

              results.push(child.val());

          });

          results.reverse();

          for (let player of results) {

              leaderboardHTML +=
                  "<li>" +
                  player.name +
                  " - " +
                  player.score +
                  "</li>";

          }

          leaderboardHTML += "</ol>";

          document.getElementById(outputID).innerHTML = leaderboardHTML;

      });

}

loadLeaderboard("planetMerge", "mergeLeaderboard");
loadLeaderboard("geoDash", "geoLeaderboard");
