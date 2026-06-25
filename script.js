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

firebase.auth().onAuthStateChanged(function(user){

  if(user){
    document.getElementById("loggedOutNav").style.display = "none";
    document.getElementById("loggedInNav").style.display = "flex";

    document.getElementById("navPfp").src = user.photoURL;
  } else{
    
    document.getElementById("loggedOutNav").style.display = "block"
    document.getElementById("loggedInNav").style.display = "none";

  }

});

function fb_logOut() {
  authenticationListener();
  firebase.auth().signOut();
  console.log("logged out")
}

