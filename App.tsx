import React, { useState, useEffect, useContext } from 'react';
import { Platform, Alert, TextInput, StyleSheet, Text, ScrollView, StatusBar, View, TouchableOpacity } from 'react-native';
//import firebase from 'firebase/app';
import App from './screens/mobileApp';
import WebApp from './screens/webApp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createContext } from 'react';
import firebase from 'firebase'
//export var firebase = require('firebase/app');
//require('firebase/database');


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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const Stack = createStackNavigator();

export const AppStateContext = React.createContext({});
export default function AppWrapper() {
  const [users, setUsers] = useState();
  useEffect(() => {
    firebase.database().ref("users").once('value').then((res) => { setUsers(res.val()) })
  }
    , []);
  if (!users) return (<View></View>);
  return (
    <AppStateContext.Provider value={users}>
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
    </AppStateContext.Provider>
  );
}

export function AdminUser({ route }) {

  const [users, setUsers] = useState();
  useEffect(() => {
    firebase.database().ref("users").once('value').then((res) => { setUsers(res.val()) })
  }
    , []);
  if (!users) return (
    <View style={styles.appContainer}>
      <StatusBar />
      <View style={styles.timestampView}>
        <Text style={styles.usernameText}>Loading...</Text>
      </View>
    </View>
  );
  const username = route.params.username;
  if (!users[username].logs) return (
    <View style={styles.appContainer}>
      <StatusBar />
      <View style={styles.timestampView}>
        <Text style={styles.usernameText}>Não existem logs para o user {username}!</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.appContainer}>
      <StatusBar />
      <View style={styles.userView}>
        <Text style={styles.usernameText}>{username}</Text>
        <ScrollView style={styles.usersContainer}>{
          Object.keys(users[username].logs).map((timestamp, index) => {
            return (
              <View key={index}>
                <View style={styles.timestampView} >
                  <View style={styles.logStateContainer}>
                    <Text style={styles.usernameText}>{users[username].logs[timestamp]}</Text>
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
                {users[username].logs[timestamp] == "Saiu" &&
                  <View style={styles.timestampDiffView}>
                    <Text style={styles.usernameText}>
                    Tempo de trabalho (minutos): {new Date(parseInt(timestamp) - parseInt(Object.keys(users[username].logs)[index - 1])).toLocaleTimeString()}
                    </Text>
                  </View>
                }

              </View>

            );
          }
          )
        }</ScrollView>
      </View>
    </View>
  );
}

export function Admin({ navigation }) {
  const users = useContext(AppStateContext);
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
                  navigation.push('AdminUser', { username })
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
  timestampDiffView: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
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
