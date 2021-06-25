import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, StatusBar, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import {AppStateContext} from '../App';
import Dialog from 'react-native-dialog';



export default function App({ navigation }) {
  const [inputText, setInputText] = useState("");
  const users = useContext(AppStateContext);
  return (
    <View style={styles.appContainer}>
      <StatusBar />
      <ScrollView style={styles.usersContainer}>
        { 
          Object.keys(users).map((user, index) => {
            const [visible, setVisible] = useState(false);
            const [buttonState, setButtonState] = useState(false);
            useEffect(() => {
              if(users[user].logs) {
                users[user].logs[Object.keys(users[user].logs)[(Object.keys(users[user].logs).length - 1)]] == "Entrou" ? setButtonState(true) : setButtonState(false);
                console.log(Object.keys(users[user].logs)[(Object.keys(users[user].logs).length - 1)])

              }
            }, [])
            const showDialog = () => {
              setVisible(true);
            };

            const handleCancel = () => {
              setVisible(false);
            };
            return (
              <View style={styles.userView} key={index}>
                <TouchableOpacity style={[styles.buttonContainer, {
                  backgroundColor: users[user].admin ? "#4D4E4F" : (buttonState ? "green" : "red")
                }]} onPress={showDialog}>
                  <View>
                    <Text style={styles.usernameText}>{user}</Text>
                    <Dialog.Container visible={visible} >
                      <Dialog.Title>Inserir password</Dialog.Title>
                      <Dialog.Description>
                        Insira a sua password para começar!
                      </Dialog.Description>
                      <Dialog.Input secureTextEntry onChangeText={(text) => { setInputText(text) }} keyboardType='number-pad'></Dialog.Input>
                      <Dialog.Button label="OK" onPress={() => {
                        firebase.auth().signInWithEmailAndPassword(user.toLowerCase() + "@log-my-work.pt", inputText + "99")
                          .then(()=>{
                            if (buttonState) {
                              setButtonState(false);
                              firebase.database().ref('users/' + user + '/logs/' + Date.now()).set(
                                'Saiu'
                              );
                            }
                            else {
                              if (users[user].admin) {
                                navigation.push('Admin');
                              }
                              else {
                                setButtonState(true);
                                firebase.database().ref('users/' + user + '/logs/' + Date.now()).set(
                                  'Entrou'
                                );
                              }
  
                            }
                          setInputText("");
                          handleCancel();
                          })
                          .catch((res)=>{console.log(res)});
                         
                      }} />
                      <Dialog.Button label="Cancel" onPress={handleCancel} />
                    </Dialog.Container>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        }
      </ScrollView>
    </View>


  );
}

const styles = StyleSheet.create({
  appContainer: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: '#000',
  },
  usersContainer: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: '#000',
  },
  userView: {
    padding: 10,
  },
  usernameText: {
    color: "#fff",
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center'
  },
  timestampView: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timestampContainer: {

  },
  logStateContainer: {
  }
});
