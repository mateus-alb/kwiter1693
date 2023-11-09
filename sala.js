const firebaseConfig = {
    apiKey: "AIzaSyD9S8mipgjwhdLpcDWZPOEbEZwcoNzpCZQ",
    authDomain: "twiter-da-deep-web.firebaseapp.com",
    databaseURL: "https://twiter-da-deep-web-default-rtdb.firebaseio.com",
    projectId: "twiter-da-deep-web",
    storageBucket: "twiter-da-deep-web.appspot.com",
    messagingSenderId: "197557870992",
    appId: "1:197557870992:web:6f5cccf8d4d9fd6c6f1315",
    measurementId: "G-9VHP490F00"
  };
firebase.initializeApp(firebaseConfig);

inicializar();

function inicializar() {
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    // console.log(nomeUsuario);
    document.getElementById("nomeUsuario").textContent = "Olá, " + nomeUsuario + "!";

    getData();
}

function addSala() {
    const nomeSala = document.getElementById("nomeSala").value;
    console.log(nomeSala);
    if (nomeSala) {
        firebase.database().ref('/').child(nomeSala).set({
            purpose: "sala criada"
        });

        carregaSala(nomeSala);
    }
}

function getData() {
    firebase.database().ref('/').on("value", snapshot => {
        let salas = [];
        snapshot.forEach(childSnapshot => {
            const childKey = childSnapshot.key;
            const html = '<div class="nomeSala" id="'
                + childKey
                + '" onclick="carregaSala(this.id)">#'
                + childKey
                + '</div>'
            salas.push(html);
        });
        document.getElementById("output").innerHTML = salas.join("");
        // const output = document.getElementById("output");
        // output.innerHTML = salas.join("");
    });
}

function carregaSala(sala) {
    localStorage.setItem("nomeSala", sala);
    location = "chat.html";
}