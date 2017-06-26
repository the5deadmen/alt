firebase.auth().signInWithPopup(provider).then(function(result) {
    let provider = new firebase.auth.FacebookAuthProvider();
    let token = result.credential.accessToken;
    // The signed-in user info.
    let user = result.user;
    // ...
}).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    // ...
});