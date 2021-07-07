import React, { useState, useEffect, useContext } from 'react';
import { Platform, Alert, TextInput, StyleSheet, Text, ScrollView, StatusBar, View, TouchableOpacity } from 'react-native';
//import firebase from 'firebase/app';
import App from './screens/mobileApp';
import WebApp from './screens/webApp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createContext } from 'react';
import { firebaseConfig } from './firebaseConfig';
import firebase from 'firebase'
//export var firebase = require('firebase/app');
//require('firebase/database');


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
    firebase.database().ref("users").on('value', (res) => { setUsers(res.val()); });


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
            headerBackTitle: 'Logout',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFF'
          }} />
          <Stack.Screen name="AdminUserDays" component={AdminUserDays} options={{
            title: 'Dias de Trabalho',
            headerTitleStyle: { alignSelf: 'center' },
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFF'
          }} />
          <Stack.Screen name="AdminUserDay" component={AdminUserDay} options={{
            title: 'Log do Dia',
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

export function AdminUserDays({ navigation, route }) {
  const users = useContext(AppStateContext);
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
  const timestamps = Object.keys(users[username].logs)
  let lastDay = "0";
  const daysArray = [];
  for (let timestamp of timestamps) {
    const lastDayDate = new Date(parseInt(lastDay))
    const timestampDate = new Date(parseInt(timestamp));

    if (timestampDate.getDay() != lastDayDate.getDay() ||
      timestampDate.getMonth() != lastDayDate.getMonth() ||
      timestampDate.getFullYear() != lastDayDate.getFullYear()) {
      lastDay = timestamp;
      daysArray.push(timestampDate)
    }
  }
  return (
    <View style={styles.appContainer}>
      <StatusBar />
      <View style={styles.userView}>
        <Text style={styles.usernameText}>{username}</Text>
        <ScrollView style={styles.usersContainer}>{
          daysArray.map((day, index) => {
            return (
              <View style={styles.web_buttonContainerContainer} key={index}>
                  <TouchableOpacity style={[styles.web_buttonContainer, {
                    backgroundColor: "darkorchid"
                  }]} onPress={() => {
                  navigation.push("AdminUserDay", { username, day: day.getTime() })
                }}>
                  <View>
                    <Text style={styles.web_usernameText}>{day.toLocaleDateString()}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        }</ScrollView>
      </View>
    </View>
  );
}

export function AdminUserDay({ route }) {
  const users = useContext(AppStateContext);
  if (!users) return (
    <View style={styles.appContainer}>
      <StatusBar />
      <View style={styles.timestampView}>
        <Text style={styles.usernameText}>Loading...</Text>
      </View>
    </View>
  );
  const username = route.params.username;
  const day = new Date(route.params.day);
  return (
    <View style={styles.appContainer}>
      <StatusBar />
      <View style={styles.userView}>
        <Text style={styles.usernameText}>{username}</Text>
        <ScrollView style={styles.usersContainer}>{
          Object.keys(users[username].logs).map((timestamp, index) => {
            const interval = Math.abs(parseInt(timestamp) - parseInt(Object.keys(users[username].logs)[index - 1]));
            const hours = Math.floor(interval / 3.6e6);
            const minutes = Math.floor(interval / 6e4) % 60;
            const seconds = Math.floor(interval / 1000) % 60;
            const timestampDate = new Date(parseInt(timestamp));
            if (timestampDate.getDay() === day.getDay() &&
              timestampDate.getMonth() === day.getMonth() &&
              timestampDate.getFullYear() === day.getFullYear());
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
                  <View style={[styles.timestampDiffView, {
                    borderBottomWidth: 10,
                    borderBottomColor: 'darkorchid',
                    
                  }]}>
                    <Text style={styles.workHoursText} >
                      Tempo de trabalho (hh : mm : ss)
                    </Text>
                    <Text style={styles.workHoursText} >
                      {hours < 10 ? '0' + hours : hours} : {minutes < 10 ? '0' + minutes : minutes} : {seconds < 10 ? '0' + seconds : seconds}
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
        <View style={styles.userView}>

          <ScrollView style={styles.usersContainer}>{
            
            Object.keys(users).filter((username)=>{
              return !users[username].admin;
            }).map((username, index) => {
              console.log(users[username].admin)
              return (
                <View style={styles.web_buttonContainerContainer} key={index}>
                  <TouchableOpacity style={[styles.web_buttonContainer, {
                    backgroundColor: "darkorchid"
                  }]} onPress={() => {
                    navigation.push('AdminUserDays', { username })
                  }}>
                    <View>
                      <Text style={styles.web_usernameText}>{username}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          }</ScrollView>
        </View>
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
    display: 'flex',
    flexDirection: 'column',
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
  workHoursText: {
    color: "#fff",
    textAlign: 'center',
  }
});
