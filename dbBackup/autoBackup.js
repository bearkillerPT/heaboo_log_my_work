import firebase from 'firebase-admin';
import {firebaseConfig} from './firebaseConfig.js';
setTimeout(
  () => {
    const fs = require('fs');
    let path = "dbBackup/" + Date.now().toString() + '.json';
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
    const database = firebase.database();
    let backupContent = database.ref('./').once('value')
    .then(
      (val) => {
        fs.open(path, 'w', function (err, fd) {
          if (err) {
            throw 'could not open file: ' + err;
          }
    
          // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
          fs.write(fd, val.val(), 0, val.val().toString().length, null, function (err) {
            if (err) throw 'error writing file: ' + err;
            fs.close(fd, function () {
              console.log('wrote the file successfully');
            });
          });
        });
      }
    )
    .catch(console.log);
    // open the file in writing mode, adding a callback function where we do the actual writing
    
  }
  , 43200
);