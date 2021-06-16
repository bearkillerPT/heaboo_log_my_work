import React, { useState} from 'react';
import { StyleSheet, Text, ScrollView, StatusBar, View, TouchableOpacity} from 'react-native';
import Dialog from "react-native-dialog";
const users = [
  {
    "username": "João Cabeça de Melão",
    "password": "1234"
  },
  {
    "username": "Pedro el Chefe",
    "password": "1234"
  },
]

export default function App() {
  const [visible, setVisible] = useState(false);
  const [inputText, setInputText] = useState("");

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <View  style={styles.appContainer}>
    <StatusBar  />
    <ScrollView style={styles.usersContainer}>
      {
        users.map((user, index) => {
          const [buttonsState, setButtonsState] = useState(false);
          return(
            <View style={styles.userView} key={index}>
              <TouchableOpacity style={[styles.buttonContainer, {
                backgroundColor: buttonsState ? "green" : "red"
              }]} onPress={showDialog}> 
                <View>
                  <Text style={styles.usernameText}>{user.username}</Text>
                  <Dialog.Container visible={visible}>
                  <Dialog.Title>Inserir password</Dialog.Title>
                  <Dialog.Description>
                    Insira a sua password para começar!
                  </Dialog.Description>
                  <Dialog.Input secureTextEntry onChangeText={(text) => {setInputText(text)}}></Dialog.Input>
                  <Dialog.Button label="OK" onPress={()=>{
                    if(inputText == user.password)
                      buttonsState ? setButtonsState(false) : setButtonsState(true); 
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
    marginTop: 40,
  },
  userView: {
    padding: 10,
  },
  usernameText: {
    color: "#fff",
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center'
  }
});
