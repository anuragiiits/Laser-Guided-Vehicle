// import * as firebase from  'firebase';
var firebase = require("firebase");
var fs = require('fs');
var config = {
    apiKey: "AIzaSyBwzbvff8Hy2-5oE7kcdb1MGtK_pjtHiKc",
    authDomain: "vocshare-38d1f.firebaseapp.com",
    databaseURL: "https://vocshare-38d1f.firebaseio.com",
    projectId: "vocshare-38d1f",
    storageBucket: "vocshare-38d1f.appspot.com",
    messagingSenderId: "360319060203"
  };
 firebase.initializeApp(config);

var DB = {};

var updateDB = (val) => {
	DB = val;
	console.log("DB updated, new DB: \n\n",  DB);
	var json = JSON.stringify(DB);
	fs.writeFile('db.json', json, 'utf8', ()=> console.log("Updated JSON file") );
}



var database = firebase.database();
var DocksDB = firebase.database().ref('docks/');
DocksDB.on('value', function(snapshot) {
  updateDB(snapshot.val());
});