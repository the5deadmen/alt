

let fireName = document.getElementById("name");
let fireDescription = document.getElementById("description");
let fireLove = document.getElementById("whatILove");
let fireSend = document.getElementById("fireAnswer");
let fireKpi = document.getElementById("kpiClick");
let fireMouse = document.getElementById("mouse");

// Temps qu'on passe sur le site ...
let temps = 0;
timeUp=window.setInterval(function () {
    temps++;
    $('.kpiSite').html(temps);
    if (temps == 10){
        $('#overlay').css({'display':'flex', 'justify-content':'center', 'align-content': 'center', 'align-items': 'center'});
    }
},1000);
// La souris est sur le panel "Bonjour"
var i = 0;
$( "#first" )
    .mouseover(function() {
        let firebaseMouse = firebase.database().ref().child("KPI-Mouse");
        firebaseMouse.on('value', function (snapshot) {
            fireMouse.innerText = snapshot.val();
        });
        firebaseMouse.set(++i);
        $('#mouse').html(i);
        if (i>200){
            $('#warning-mouse').css('display', 'block');
        }
        if (i>360){
            $('.mouseArea').html('<p>Sérieux Henry, ça marche là, passe en dessous ...</p>');
            $('#warning-mouse').css('display', 'none');
        }
    });


let firebaseName = firebase.database().ref().child("Users");
firebaseName.on('value', function (snapshot) {
    fireName.innerText = snapshot.val();
});

let firebaseDescription = firebase.database().ref().child("Description");
firebaseDescription.on('value', function (snapshot) {
    fireDescription.innerText = snapshot.val();
});

let firebaseAnswer = firebase.database().ref().child("Love");
firebaseAnswer.on('value', function (snapshot) {
    fireSend.innerText = snapshot.val();
});

$('#closeOverlay').click(function(){
    $('#overlay').css('display', 'none');
});

$('.google-btn').click(function () {
    // var firebaseRef = firebase.database().ref();
    let firebaseKpi = firebase.database().ref().child("KPI-Click");
    firebaseKpi.on('value', function (snapshot) {
        fireKpi.innerText = snapshot.val();
    });
    firebaseKpi.set(++fireKpi);

    // Pas réussi à faire :
    // après avoir envoyé la donné en base (donc +1 à chaque clic qui écrase la donnée précédente),
    // la récupérer en base pour la faire afficher sur la page KPI

});


// attention je vais ecrire en base
function submitClick() {
    var firebaseRef = firebase.database().ref();
    // ce que le visiteur va marquer, je le recupere en base
    var messageLove = fireLove.value;
    if (messageLove == '') {
        alert('écris un truc quand même ...');
        return false;
    }
    // BIM j'écris en base !
    firebaseRef.child("Love").set(messageLove);
    // et apres je vire le bouton envoyer, l'input, et j'affiche la réponse !
    $('#sendLove').css('display', 'none');
    $('#whatILove').css('display', 'none');
    $('#whatIsLove').html('');
    $('#answers').css('display', 'block');
}
// une variable pour se connecter
function verif() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let userProfil = firebase.auth().currentUser;
            if (userProfil != null) {
                // on recupere les infos du user qui s'est connecte
                let name, email, photoUrl, uid, emailVerified;
                name = userProfil.displayName;
                email = userProfil.email;
                photoUrl = userProfil.photoURL;
                $('.profil').html('<img class="profilPicture" src="' + photoUrl + '"/>');
                $('.profil').html('<p class="contact"> Félicitation <strong>' + name + ' !</strong><br> Vous êtes désormais pré-inscrit sur Split.</p>');
                $('.co').css('visibility','hidden');
                $('.e-mail').css('visibility','visible');
                $('#whatILove').css('display', 'block');
                $('#sendLove').css('display', 'block');
                $('#answers').css('display', 'none');
            }
           
            console.log('connecté !');
        } else {
           
            $('.profil').html('');
            $('.dialogue').html('');
            $('#whatILove').css('display', 'none');
            $('#sendLove').css('display', 'none');
            $('#answers').css('display', 'none');

        }
    });
}

function connexion() {
    let user = firebase.auth().currentUser;
    if (user) {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            $('.co').css('visibility','hidden');
            $('.profilout').css('visibility','hidden');
            $('.google-btn').css('visibility','visible');
            console.log('déconnecté!');
        });

    } else {
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
        }).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            // ...
        });
    }
}
verif();
$('.google-btn').on('click', function () {
    connexion();
});

/**
 * Created by yeahright on 15/06/2017.
 */

