import firebase from 'firebase';
import { AppStateContext } from '../App';
import React, { useState, useContext, useEffect } from 'react';
import { TextInput, StyleSheet, Text, ScrollView, StatusBar, View, TouchableOpacity } from 'react-native';

export default function WebApp({ navigation, route }) {
  const users = useContext(AppStateContext);
  return (
    <View style={styles.web_appContainer}>
      <StatusBar />
      <ScrollView style={styles.web_usersContainer}>
        {
          Object.keys(users).map((user, index) => {
            const [inputText, setInputText] = useState("");
            const [insertingPasswd, setInsertingPasswd] = useState(false);
            const [buttonState, setButtonState] = useState(false);   
            useEffect(() => {
              if(users[user].logs) {
                users[user].logs[Object.keys(users[user].logs)[(Object.keys(users[user].logs).length - 1)]] == "Entrou" ? setButtonState(true) : setButtonState(false);
              }
            }, [users])        
            return (
              <View style={styles.web_userView} key={index}>
                {insertingPasswd &&
                  <View style={styles.web_buttonContainerAndInput}>
                    <View style={styles.web_passwdInputContainer}>
                      <TextInput style={styles.web_passwdInput} secureTextEntry onChangeText={(text) => setInputText(text)}>
                      </TextInput>

                    </View>
                    <View style={{ display: 'flex', flex: 1 }}>
                      <TouchableOpacity style={styles.web_confirmInputContainer} onPress={() => {
                        firebase.auth().signInWithEmailAndPassword(user.toLowerCase() + "@log-my-work.pt", inputText + "99")
                          .then(() => {
                            if (users[user].admin) {
                              navigation.push("Admin")

                            }
                            //else{
                            //  firebase.database().ref("users/" + user + "/logs/" + Date.now()).set(
                            //    buttonState ? "Saiu" : "Entrou" 
                            //  );
                            //  buttonState ? setButtonState(false) :  setButtonState(true);
                            //}
                            setInsertingPasswd(false);
                            setInputText('');
                          })
                          .catch((res) => { console.log(res) });
                      }} >
                        <View style={styles.web_confirmInput} >
                          <Text style={styles.web_buttonText} numberOfLines={1} >Confirmar</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.web_cancelInputContainer} onPress={() => setInsertingPasswd(false)}>
                        <View style={styles.web_cancelInput} >
                          <Text style={styles.web_buttonText} numberOfLines={1} >Cancelar</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                }
                {!insertingPasswd &&
                  <View style={styles.web_buttonContainerContainer}>
                    <TouchableOpacity style={[styles.web_buttonContainer, {
                      backgroundColor: users[user].admin ? "#7E7E7E" : buttonState ?   "#14CE95" : "#EB5C52"
                    }]} onPress={() => {
                      insertingPasswd ? setInsertingPasswd(false) : setInsertingPasswd(true)
                    }}>
                      <View>
                        <Text style={styles.web_usernameText}>{user}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                }
              </View>
            );
          })
        }
      </ScrollView>
    </View>


  );
}
const styles = StyleSheet.create({
  web_appContainer: {
    backgroundColor: '#000',
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  web_usersContainer: {
    backgroundColor: '#313131',
    padding: 10,
  },
  web_userView: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  web_usernameText: {
    color: "#fff",
    textAlign: 'center',
    fontSize: 30
  },
  web_buttonContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center'
  },
  web_buttonContainerContainer: {

    display: 'flex',
    flexDirection: 'row',
    padding: 11.5,
  },
  web_buttonContainerAndInput: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center'
  },
  web_timestampView: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  web_timestampContainer: {

  },
  web_logStateContainer: {
  },
  web_passwdInput: {
    flex: 1,
    borderColor: 'white',
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#252525',
    color: '#FFF',
    fontSize: 20,
  },
  web_passwdInputContainer: {
    justifyContent: 'space-between',
    alignContent: 'space-between',
    flexDirection: 'row',
    flex: 1
  },
  web_cancelInputContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 2
  },
  web_cancelInput: {
    flex: 1,
    backgroundColor: "#EB5C52", 
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 15,


  },
  web_confirmInputContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 2
  },
  web_confirmInput: {
    flex: 1,
    backgroundColor: "#14CE95", //
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  web_buttonText: {
    color: "#fff",
    textAlign: 'center',
    fontSize: 20
  },
});
