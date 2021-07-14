const { json } = require('body-parser');
const { white } = require('color-name');
var firebase = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');



const sleep = async(ms) =>{
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const doBackup = async () => {
  const fs = require('fs');
  let path = Date.now().toString() + '.json';
  if (!firebase.apps.length) {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: "https://log-my-work-8db34-default-rtdb.firebaseio.com"
    });
  } else {
    firebase.app(); // if already initialized, use that one
  }
  
  const database = firebase.database();
  console.log(database)

  database.ref('/users/').once('value',
    (val) => {
      console.log(JSON.stringify(val.val()))
      fs.writeFileSync(__dirname + "/" + path, JSON.stringify(val.val()), err => {
        if (err) {
          console.error(err)
          return
        }
      })
    })
}

setInterval(doBackup, 43200000);
