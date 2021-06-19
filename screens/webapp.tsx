import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, ScrollView, StatusBar, View, TouchableOpacity } from 'react-native';
import { users } from '../App'

export default function WebApp({ navigation }) {
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
            const [insertingPasswd, setInsertingPasswd] = useState(false)
            return (
              <View style={styles.userView} key={index}>
                {insertingPasswd &&
                  <View style={styles.passwdInputContainer}>
                  <TextInput style={styles.passwdInput} secureTextEntry onChangeText={(text) => setInputText(text)}>
                  </TextInput>
                  <TouchableOpacity style={styles.cancelInputContainer} onPress={() => setInsertingPasswd(false)}>
                    <View style={styles.cancelInput} >
                      <Text style={styles.usernameText}>Cancelar</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.confirmInputContainer} onPress={() => {
                    if(user.password == inputText)
                     navigation.push('Admin')
                    setInsertingPasswd(false);
                  }}>
                    <View style={styles.confirmInput} >
                      <Text style={styles.usernameText}>Cancelar</Text>
                    </View>
                  </TouchableOpacity>
                  </View>
                }
                {!insertingPasswd &&
                  <TouchableOpacity style={[styles.buttonContainer, {
                    backgroundColor: buttonsState ? "green" : "red"
                  }]} onPress={() => {
                    if(user.admin)
                      insertingPasswd ? setInsertingPasswd(false) : setInsertingPasswd(true)
                    //buttonsState ? setButtonsState(false) : setButtonsState(true);
                  }}>
                    <View>
                      <Text style={styles.usernameText}>{userState.username}</Text>
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
  },
  passwdInput: {
    height: 40, 
    width: 700,
    borderColor: 'white', 
    borderWidth: 1,
    color: '#FFF'
  },
  passwdInputContainer: {
    justifyContent: 'space-around',
    alignContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
  },
  cancelInputContainer :{
    backgroundColor: 'red',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical : 14
  },
  cancelInput :{
    backgroundColor: 'red',
  },
  confirmInputContainer :{
    backgroundColor: 'green',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical : 14
  },
  confirmInput :{
    backgroundColor: 'green',
  }
});
