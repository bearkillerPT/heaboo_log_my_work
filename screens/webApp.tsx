import firebase from 'firebase';
import {AppStateContext} from '../App';
import React, { useState, useContext } from 'react';
import { TextInput, StyleSheet, Text, ScrollView, StatusBar, View, TouchableOpacity } from 'react-native';

export default function WebApp({navigation, route}) {
  const users = useContext(AppStateContext);
  return (
    <View style={styles.web_appContainer}>
      <StatusBar />
      <ScrollView style={styles.web_usersContainer}>
        {
         Object.keys(users).map((user, index) => {
            const [buttonsState, setButtonsState] = useState(false);
            const [inputText, setInputText] = useState("");
            const [insertingPasswd, setInsertingPasswd] = useState(false)
            return (
              <View style={styles.web_userView} key={index}>
                {insertingPasswd &&
                  <View style={styles.web_passwdInputContainer}>
                    <TextInput style={styles.web_passwdInput} secureTextEntry onChangeText={(text) => setInputText(text)}>
                    </TextInput>
                    <View style={{ display: 'flex', flex: 1 }}>
                      <TouchableOpacity style={styles.web_cancelInputContainer} onPress={() => setInsertingPasswd(false)}>
                        <View style={styles.web_cancelInput} >
                          <Text style={styles.web_buttonText}>Cancelar</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.web_confirmInputContainer} onPress={() => {
                        
                          firebase.auth().signInWithEmailAndPassword(user.toLowerCase() + "@log-my-work.pt", inputText + "99")
                            .then( ()=> {
                              if(users[user].admin)
                                navigation.push("Admin")
                              else{
                                firebase.database().ref("users/" + user + "/logs/" + Date.now()).set(
                                  buttonsState ? "Saiu" : "Entrou" 
                                );
                                buttonsState ? setButtonsState(false) :  setButtonsState(true);
  
                                setInsertingPasswd(false); 
                              }
                            })
                            .catch((res)=>{console.log(res)});
                    }} >
                        <View style={styles.web_confirmInput} >
                          <Text style={styles.web_buttonText}>Confirmar</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
                {!insertingPasswd &&
                  <TouchableOpacity style={[styles.web_buttonContainer, {
                    backgroundColor: users[user].admin ? "#4D4E4F" : buttonsState ? "green" : "red"
                  }]} onPress={() => {
                      insertingPasswd ? setInsertingPasswd(false) : setInsertingPasswd(true)
                  }}>
                    <View>
                      <Text style={styles.web_usernameText}>{user}</Text>
                    </View>
                  </TouchableOpacity>
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
    maxHeight: 800
  },
  web_usersContainer: {
    backgroundColor: '#000',
  },
  web_userView: {
    display: 'flex',
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  web_usernameText: {
    color: "#fff",
    textAlign: 'center',
    fontSize: 30
  },
  web_buttonContainer: {
    padding: 20,
    borderRadius: 10,
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
    borderWidth: 1,
    color: '#FFF',
    fontSize: 20,
    marginTop: 5
  },
  web_passwdInputContainer: {
    justifyContent: 'space-between',
    alignContent: 'space-between',
    flexDirection: 'row',
    display: 'flex'
  },
  web_cancelInputContainer: {
    flex: 1,
    backgroundColor: 'red',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 40,
    paddingVertical: 6,
  },
  web_cancelInput: {
    backgroundColor: 'red'

  },
  web_confirmInputContainer: {
    flex: 1,
    backgroundColor: 'green',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 40,
    paddingVertical: 6,
  },
  web_confirmInput: {
    backgroundColor: 'green'
  },
  web_buttonText: {
    color: "#fff",
    textAlign: 'center',
    fontSize: 12
  },
});
