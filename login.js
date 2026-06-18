function fb_login() {

  firebase.auth().onAuthStateChanged((user) => {

    if (user) {

      console.log("Logged in");


      document.getElementById("userPfp").src = user.photoURL;

    } else {

      console.log("Not logged in");

      var provider =
        new firebase.auth.GoogleAuthProvider();

      provider.addScope('profile');
      provider.addScope('email');

      firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {

          var user = result.user;

          console.log(user);

          document.getElementById("userPfp").src = user.photoURL;

        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
}


async function writeForm() {

  const gameName =
    document.getElementById("gameName").value;

  const age =
    document.getElementById("age").value;

  // Get logged-in user
  let user = firebase.auth().currentUser;

  // Make sure user is logged in
  if (!user) {

    alert("Please log in first.");
    return;

  }

  if (!gameName || !age) {

    alert("Please fill all the boxes.");
    return;

  }

  let userID = user.uid;
  let userImage = user.photoURL;
  let userEmail = user.email;
  let userDisplayName = user.displayName;

  try{ 

  await firebase.database().ref("userInfo/" + userID).set({

    gameName: gameName,
    age: age,
    email: userEmail,
    profilePicture: userImage,
    displayName: userDisplayName


  });

  console.log("Data sent!");

  window.location.href='index.html';

} catch(error) {

  console.error(error);
  alert("Failed to save data.")
}
}