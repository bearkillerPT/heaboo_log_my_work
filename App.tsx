import React, { useState, useEffect } from 'react';
import { Platform, Alert, TextInput, StyleSheet, Text, ScrollView, StatusBar, View, TouchableOpacity } from 'react-native';
//import firebase from 'firebase/app';
import App from './screens/app';
import Dialog from 'react-native-dialog';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
export var firebase = require('firebase/app');
require('firebase/database');
export const users = [
  {
    "username": "Francisco",
    "password": "2378",
    "admin": false
  },
  {
    "username": "Alexandre",
    "password": "4536",
    "admin": false
  },

  {
    "username": "Administrador",
    "password": "6748",
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

console.log("Heroku sucks sometimes...");

function AppWrapper() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        {Platform.OS !== "web" &&
          <Stack.Screen name="Home" component={App} options={{
            title: 'Registo produção Hoterway',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFF'
          }} />
        }
        {Platform.OS === "web" &&
          <Stack.Screen name="Home" component={WebApp} options={{
            title: 'Registo produção Hoterway',
            headerTitleStyle: { alignSelf: 'center' },
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFF',
          }} />
        }
        <Stack.Screen name="Admin" component={Admin} options={{
          title: 'Admin',
          headerTitleStyle: { alignSelf: 'center' },
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFF'
        }} />
        <Stack.Screen name="AdminUser" component={AdminUser} options={{
          title: 'Admin',
          headerTitleStyle: { alignSelf: 'center' },
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


function WebApp({ navigation }) {
  const [inputText, setInputText] = useState("");
  return (
    <View style={styles.web_appContainer}>
      <StatusBar />
      <ScrollView style={styles.web_usersContainer}>
        {
          users.map((user, index) => {
            const [buttonsState, setButtonsState] = useState(false);
            const [userState, setUserState] = useState(user);
            const [insertingPasswd, setInsertingPasswd] = useState(false)
            return (
              <View style={styles.web_userView} key={index}>
                {insertingPasswd &&
                  <View style={styles.web_passwdInputContainer}>
                    <TextInput style={styles.web_passwdInput} secureTextEntry onChangeText={(text) => setInputText(text)}>
                    </TextInput>
                    <View style={{display: 'flex', flex: 1}}>
                      <TouchableOpacity style={styles.web_cancelInputContainer} onPress={() => setInsertingPasswd(false)}>
                        <View style={styles.web_cancelInput} >
                          <Text style={styles.web_buttonText}>Cancelar</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.web_confirmInputContainer} onPress={() => {
                        if (user.password == inputText)
                          navigation.push('Admin')
                        setInsertingPasswd(false);
                      }}>
                        <View style={styles.web_confirmInput} >
                          <Text style={styles.web_buttonText}>Confirmar</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
                {!insertingPasswd &&
                  <TouchableOpacity style={[styles.web_buttonContainer, {
                    backgroundColor: user.admin ? "#4D4E4F" : buttonsState ? "green" : "red"
                  }]} onPress={() => {
                    if (user.admin)
                      insertingPasswd ? setInsertingPasswd(false) : setInsertingPasswd(true)
                    //buttonsState ? setButtonsState(false) : setButtonsState(true);
                  }}>
                    <View>
                      <Text style={styles.web_usernameText}>{userState.username}</Text>
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
