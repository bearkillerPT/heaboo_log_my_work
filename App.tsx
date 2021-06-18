import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, StatusBar, View, TouchableOpacity } from 'react-native';
import Dialog from "react-native-dialog";
//import firebase from 'firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
var firebase = require('firebase/app');
require('firebase/database');

const users = [
  {
    "username": "João Cabeça de Melão",
    "password": "1234",
    "admin": false
  },
  {
    "username": "Pedro el Chefe",
    "password": "1234",
    "admin": false
  },

  {
    "username": "Rui Teixeira",
    "password": "1234",
    "admin": true
  },
]

const firebaseConfig = {
  apiKey: "AIzaSyA9MV-PgCXfWhnGt-FRHlVIzlvUuRhVmRc",
  authDomain: "log-my-work-8db34.firebaseapp.com",
  databaseURL: "https://log-my-work-8db34-default-rtdb.firebaseio.com",
  projectId: "log-my-work-8db34",
  storageBucket: "log-my-work-8db34.appspot.com",
  messagingSenderId: "721021340350",
  appId: "1:721021340350:web:75b15661f04266d863ecef",
  measurementId: "G-86K99VSDRW"
};

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

function AppWrapper() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={App} options={{
          title: 'A trabalhar',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFF'
        }} />
        <Stack.Screen name="Admin" component={Admin} options={{
          title: 'Admin',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFF'
        }} />
        <Stack.Screen name="AdminUser" component={AdminUser} options={{
          title: 'Admin',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFF'
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppWrapper;

function AdminUser({ route }) {
  return (
    <View style={styles.appContainer}>
      <StatusBar />
      <View style={styles.userView}>
        <Text style={styles.usernameText}>{route.params.username}</Text>
        <ScrollView style={styles.usersContainer}>{
          Object.keys(route.params.user).map((timestamp, index) => {
            return (
              <View style={styles.timestampView} key={index}>
                <View style={styles.logStateContainer}>
                  <Text style={styles.usernameText}>{route.params.user[timestamp]}</Text>
                </View>
                <View style={styles.timestampContainer}>
                  <Text style={styles.usernameText}>
                    {new Date(parseInt(timestamp)).toDateString()}
                  </Text>
                  <Text style={styles.usernameText}>
                    {new Date(parseInt(timestamp)).toLocaleTimeString()}
                  </Text>
                </View>
              </View>
            );
          }
          )
        }</ScrollView>
      </View>
    </View>
  );
}

function Admin({ navigation }) {
  const [users, setUsers] = useState({});
  firebase.database().ref('users/').once('value').then((res) => {
    setUsers(res.val());
  });
  if (users == null)
    return (
      <View style={styles.appContainer}>
        <StatusBar />
        <Text style={styles.usernameText}>Loading....</Text>
      </View>
    );
  else
    return (
      <View style={styles.appContainer}>
        <StatusBar />
        <ScrollView style={styles.usersContainer}>{
          Object.keys(users).map((username, index) => {
            return (
              <View style={styles.timestampView} key={index}>
                <TouchableOpacity style={[styles.buttonContainer]} onPress={() => {
                  navigation.push('AdminUser', { username, user: users[username] })
                }}>
                  <Text style={styles.usernameText}>{username}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        }</ScrollView>
      </View>
    );
}

function App({ navigation }) {
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
                  backgroundColor: buttonsState ? "green" : "red"
                }]} onPress={showDialog}>
                  <View>
                    <Text style={styles.usernameText}>{userState.username}</Text>
                    <Dialog.Container visible={visible} >
                      <Dialog.Title>Inserir password</Dialog.Title>
                      <Dialog.Description>
                        Insira a sua password para começar!
                      </Dialog.Description>
                      <Dialog.Input secureTextEntry onChangeText={(text) => { setInputText(text) }}></Dialog.Input>
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
