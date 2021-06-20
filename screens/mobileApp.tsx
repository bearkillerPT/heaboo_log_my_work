import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, StatusBar, View, TouchableOpacity } from 'react-native';
//import firebase from 'firebase/app';
import Dialog from 'react-native-dialog';
import { firebase, users } from '../App'
export default function App({ navigation }) {
  const [inputText, setInputText] = useState("");
  return (
    <View style={styles.appContainer}>
      <StatusBar />
      <ScrollView style={styles.usersContainer}>
        {
          users.map((user, index) => {
            const [visible, setVisible] = useState(false);
            const [buttonsState, setButtonsState] = useState(false);
            const [userState, setUserState] = useState(user);
            const showDialog = () => {
              setVisible(true);
            };

            const handleCancel = () => {
              setVisible(false);
            };
            return (
              <View style={styles.userView} key={index}>
                <TouchableOpacity style={[styles.buttonContainer, {
                  backgroundColor: user.admin ? "#4D4E4F" : buttonsState ? "green" : "red"
                }]} onPress={showDialog}>
                  <View>
                    <Text style={styles.usernameText}>{userState.username}</Text>
                    <Dialog.Container visible={visible} >
                      <Dialog.Title>Inserir password</Dialog.Title>
                      <Dialog.Description>
                        Insira a sua password para começar!
                      </Dialog.Description>
                      <Dialog.Input secureTextEntry onChangeText={(text) => { setInputText(text) }} keyboardType='number-pad'></Dialog.Input>
                      <Dialog.Button label="OK" onPress={() => {
                        if (inputText == userState.password)
                          if (buttonsState) {
                            setButtonsState(false);
                            const current_timestamp = Date.now();
                            firebase.database().ref('users/' + userState.username + '/' + current_timestamp).set(
                              'Saiu'
                            );
                          }
                          else {
                            if (userState.admin) {
                              navigation.push('Admin');
                            }
                            else {
                              setButtonsState(true);
                              const current_timestamp = Date.now();
                              firebase.database().ref('users/' + userState.username + '/' + current_timestamp).set(
                                'Entrou'
                              );
                            }

                          }
                        setInputText("");
                        handleCancel();
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
