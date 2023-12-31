import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'



const firebaseConfig = {
    apiKey: "AIzaSyA7mCUTYn88w1PU63FywnIGlTZJguIfyP4",
    authDomain: "vetorhinodatabase.firebaseapp.com",
    projectId: "vetorhinodatabase",
    storageBucket: "vetorhinodatabase.appspot.com",
    messagingSenderId: "289419623490",
    appId: "1:289419623490:web:7f9a20b3aead4ebbc501db",
    measurementId: "G-929W1VFYPC"
};

//Initialize Firebase and FireStore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth()

// Ajouter un utilisateur en base FireStore
const AjouterUnUtilisateur = async (name, mail, password) => {

    try {
        const docRef = await addDoc(collection(db, "users"), {
            name: name,
            mail: mail,
            password: password,
            rank: "User"
        });
        console.log("Document créé avec l'ID : " + docRef.id)

    } catch (e) {
        console.error("Erreur lors de l'ajout du document : ", e)
    }
}

// Ajouter un article dans la BDD (quel que soit la collection, ou la subcollection)
const AjouterUnObjet = async (name, img, desc, price, coll) => {

    try {
        const docRef = await addDoc(collection(db, coll), {
            name: name,
            img: img,
            desc: desc,
            price: price
        });
        docRef.id = name
        console.log("Document créé avec l'ID : " + docRef.id)
    } catch (e) {
        console.error("Erreur : ", e)
    }

}

// Ajouter un utilisateur dans le Auth
const AjoutAuthUser = async (mail, password) => {

    createUserWithEmailAndPassword(auth, mail, password)
        .then((userCredentials) => {

            const user = userCredentials.user;
            //console.log(user)

        })

        .catch((e) => {
            console.log(e)
        })

}

// Parcourir une collection
const RecupererCollection = async () => {

    const tableauDoc = [];

    try {
        const querySnapshot = await getDocs(collection(db, "users"));

        querySnapshot.forEach(docs => {
            let object = {
            }
            object.id = docs.id
            object.data = docs.data()
            tableauDoc.push(object)
        });
        //console.log(tableauDoc)

        return tableauDoc

    } catch (e) {
        console.error("Erreur : ", e)
    }
}

// Connexion d'un utilisateur
const ConnexionUtilisateur = async (mail, password) => {

    try {

        const response = await signInWithEmailAndPassword(auth, mail, password)

        //console.log(response)
        return response

    } catch (e) {
        console.log(e)
    }

}

// Mise à jour du profil utilisateur
const updateUser = async (name) => {

    await updateProfile(auth.currentUser, {
        displayName: `${name}`
    })

    //console.log(auth.currentUser.displayName)

}

export {
    AjouterUnUtilisateur,
    RecupererCollection,
    AjoutAuthUser,
    ConnexionUtilisateur,
    updateUser,
    AjouterUnObjet
}