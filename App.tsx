import React, { useState, useEffect } from 'react';
import { Platform, Alert, StyleSheet, Text, ScrollView, StatusBar, View, TouchableOpacity } from 'react-native';
//import firebase from 'firebase/app';
import App from './screens/app';
import WebApp from './screens/webapp';
import Dialog from 'react-native-dialog';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
export var firebase = require('firebase/app');
require('firebase/database');
export const users = [
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
        {Platform.OS !== "web" &&
        <Stack.Screen name="Home" component={App} options={{
          title: 'A trabalhar',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFF'
        }} />
        }
        {Platform.OS === "web" &&
        <Stack.Screen name="Home" component={WebApp} options={{
          title: 'A trabalhar',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFF'
        }} />
        }
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

export function Admin({ navigation }) {
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
