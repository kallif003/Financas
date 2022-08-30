import firebase from "firebase/app"
import "firebase/database"
import "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyBzqwlE3dxB_LslN7laP2nD715goBtxstI",
	authDomain: "financas-95c39.firebaseapp.com",
	databaseURL: "https://financas-95c39-default-rtdb.firebaseio.com",
	projectId: "financas-95c39",
	storageBucket: "financas-95c39.appspot.com",
	messagingSenderId: "222867011183",
	appId: "1:222867011183:web:4dc2d0202c74fccf94ff9a"
}

// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

export default firebase
