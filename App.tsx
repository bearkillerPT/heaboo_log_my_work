import React, { useState, useEffect, useContext } from 'react';
import { Platform, Alert, TextInput, StyleSheet, KeyboardAvoidingView, Text, ScrollView, StatusBar, View, TouchableOpacity } from 'react-native';
//import firebase from 'firebase/app';
import App from './screens/mobileApp';
import WebApp from './screens/webApp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createContext } from 'react';
import { firebaseConfig } from './firebaseConfig';
import firebase from 'firebase'
import {reloadAsync} from 'expo-updates'
import { Restart } from 'fiction-expo-restart';
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
  const [users, setUsers] = useState(null);
  const [usersCount, setUsersCount] = useState(0);
  useEffect(() => {
    firebase.database().ref("users").on('value', (res, b) => {
      if (usersCount == 0) setUsersCount(Object.keys(res.val()).length);
      setUsers(res.val());
    });

  }, []);
  if (!users) return (<View></View>);
  console.log(Object.keys(users).length, usersCount)
  if (Object.keys(users).length != usersCount)
    Restart();
  return (
    <AppStateContext.Provider value={users}>
      <NavigationContainer >
        <Stack.Navigator>
          {Platform.OS !== "web" &&
            <Stack.Screen name="Home" component={App} options={{
              title: 'Registo produção Hoterway',
              headerStyle: {
                backgroundColor: '#464646',
              },
              headerTintColor: '#FFF'
            }} />
          }
          {Platform.OS === "web" &&
            <Stack.Screen name="Home" component={WebApp} options={{
              title: 'Registo produção Hoterway',
              headerTitleStyle: { alignSelf: 'center' },
              headerStyle: {
                backgroundColor: '#464646',
              },
              headerTintColor: '#FFF',
            }} />
          }
          <Stack.Screen name="Admin" component={Admin} options={{
            title: 'Admin',
            headerTitleStyle: { alignSelf: 'center' },
            headerBackTitle: 'Logout',
            headerStyle: {
              backgroundColor: '#464646',
            },
            headerTitleContainerStyle: {
              left: 0, // THIS RIGHT HERE
            },
            headerTintColor: '#FFF',
          }} />
          <Stack.Screen name="AdminUserDays" component={AdminUserDays} options={{
            title: 'Dias de Trabalho',
            headerTitleStyle: { alignSelf: 'center' },
            headerStyle: {
              backgroundColor: '#464646',
            },
            
            headerTitleContainerStyle: {
              left: 0, // THIS RIGHT HERE
            },
            headerTintColor: '#FFF'
          }} />
          <Stack.Screen name="AdminUserDay" component={AdminUserDay} options={{
            title: 'Log do Dia',
            headerTitleStyle: { alignSelf: 'center' },
            headerStyle: {
              backgroundColor: '#464646',
            },
            
            headerTitleContainerStyle: {
              left: 0, // THIS RIGHT HERE
            },
            headerTintColor: '#FFF'
          }} />
          <Stack.Screen name="AdminAddUser" component={AdminAddUser} options={{
            title: 'Adicionar User',
            headerTitleStyle: { alignSelf: 'center' },
            headerStyle: {
              backgroundColor: '#464646',
            },
            
            headerTitleContainerStyle: {
              left: 0, // THIS RIGHT HERE
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

    if (timestampDate.getDate() != lastDayDate.getDate() ||
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
                  backgroundColor: "#EB5C52",
                  flex: 1
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
  const day = new Date(parseInt(route.params.day));
  return (
    <View style={styles.appContainer}>
      <StatusBar />
      <View style={styles.userView}>
        <Text style={styles.usernameText}>{username}</Text>
        <ScrollView style={styles.usersContainer}>{
          Object.keys(users[username].logs).filter((timestamp) => {
            const timestampDate = new Date(parseInt(timestamp));
            console.log(timestampDate.getDate() + " == " + day.getDate())
            return ((timestampDate.getDate() == day.getDate() &&
              timestampDate.getMonth() == day.getMonth() &&
              timestampDate.getFullYear() == day.getFullYear())
            )
          }).map((timestamp, index, dayArray) => {
            const interval = Math.abs(parseInt(timestamp) - parseInt(dayArray[index - 1]));
            const hours = Math.floor(interval / 3.6e6);
            const minutes = Math.floor(interval / 6e4) % 60;
            const seconds = Math.floor(interval / 1000) % 60;
            const timestampDate = new Date(parseInt(timestamp));
            if (timestampDate.getDate() === day.getDate() &&
              timestampDate.getMonth() === day.getMonth() &&
              timestampDate.getFullYear() === day.getFullYear());
            return (
              <View key={index} style={styles.timestampViewContainer}>
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
                    borderBottomColor: '#EB5C52',

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
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ()=>( <HeaderBackButton onPress={ ()=>{
        firebase.auth().signOut();
        navigation.goBack();
      }}/>)
    });
  }, [navigation]);
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
            Object.keys(users).filter((username) => {
              return !users[username].admin;
            }).map((username, index) => {
              return (
                  <View style={styles.web_buttonContainerContainer} key={index}>
                    <TouchableOpacity style={[styles.web_buttonContainer, {
                      backgroundColor: "#EB5C52",
                      flex: 1
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
          }
            {Platform.OS !== "web" &&
                <View style={styles.web_buttonContainerContainer}>
                  <TouchableOpacity style={[styles.web_buttonContainer, {
                    backgroundColor: "#14CE95",
                    flex: 1
                  }]} onPress={() => {
                    navigation.push('AdminAddUser')
                  }}>
                    <View>
                      <Text style={styles.web_usernameText}>Adicionar Utilizador</Text>
                    </View>
                  </TouchableOpacity>
                </View>
            }
          </ScrollView>
        </View>
      </View>
    );
}

function AdminAddUser() {
  const [done, setDone] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.registerContainer}>
        <View style={styles.userView}>
          <Text style={styles.usernameText}>Introduza as credenciais:</Text>
        </View>
        <View style={{
          display: 'flex'
        }}>
          <View style={[{
            paddingHorizontal: 20,
            display: 'flex',
            flexDirection: 'column',
          }]}>
            <Text style={styles.usernameText}>Nome</Text>
            <TextInput style={styles.web_passwdInput} onChangeText={(text) => setUsername(text)}>
            </TextInput>
          </View>
          <View style={[{
            paddingHorizontal: 20,
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: 10
          }]}>
            <Text style={styles.usernameText}>Password</Text>
            <TextInput style={styles.web_passwdInput} secureTextEntry onChangeText={(text) => setPassword(text)}>
            </TextInput>
          </View>
        </View>
        <View style={styles.userView}>
          <TouchableOpacity style={[styles.web_buttonContainer, {
            backgroundColor: done ? "#14CE95" : "#EB5C52",
          }]} onPress={() => {
            if (username !== "" && password.length > 3) {
              firebase.auth().createUserWithEmailAndPassword(username + "@log-my-work.pt", password + "99");
              firebase.database().ref('users/' + username).set({
                admin: false,
                uid: null
              })
              setTimeout(Restart(), 50);
            }
            

          }}>
            <View>
              <Text style={styles.usernameText}>Adicionar!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: '#313131',
  },
  registerContainer: {
    flexGrow: 1,
    display: 'flex',
    alignContent: 'center',
    backgroundColor: '#313131',
  },
  usersContainer: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: '#313131',
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
    padding: 15,
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
    borderColor: 'white',
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 10,
    color: '#FFF',
    fontSize: 20,
    marginTop: 5
  },
  web_passwdInputContainer: {
    justifyContent: 'space-between',
    alignContent: 'space-between',
    flexDirection: 'column',
    display: 'flex',
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
