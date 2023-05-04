import React, { useState, useEffect } from 'react';
import { authenticateUser, logOut, retrieveSession } from './authenticate';
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function LoginTest() {
  const [user, setuser] = useState();
  const [loginEmail, setloginEmail] = useState();     // input email
  const [loginPass, setloginPass] = useState();       // input pass

  const testEmail = 'admin@mail.vn';
  const testPass = 'admin123';
  
  async function handleLogin(email, password){
    if (!email || !password){
      Alert.alert(' Loginerr', 'You need to provide both email and password',
      [ //button list:
        {
          text: 'Dismiss',
          onPress: () => null,
          style: 'cancel',
        }
      ]);
      return;
    }
    var loginStatus = await authenticateUser(email, password);
    if (loginStatus[0] == 1){
      setuser(loginStatus[1]);
      setloginEmail();
      setloginPass();
    }
    else{
      setuser();
      Alert.alert('Login err', `${loginStatus[1]}`,
      [ //button list:
        {
          text: 'OK',
          onPress: () => null
        }
      ]);
    }
  }

  const getSession = async () => {
    var restoredSession = await retrieveSession();
    // restoredSession = {"email":"admin@mail.vn","password":"admin123","timestamp":1681791003793}
    if (restoredSession != null){
      console.log("login with session: " + restoredSession["email"] + ' - ' + restoredSession["password"])
      handleLogin(restoredSession['email'], restoredSession['password']);
    }
  }

  useEffect(() => {
    getSession();

  }, []);

  if (!user)
    return (
      <View style={styles.container}>
      <Text>Login page</Text>
      <Button
        title='Login'
        onPress = {() => handleLogin(loginEmail, loginPass)}  
      />
      <Button
      title='Enter credentials'
        onPress = {() => {
          setloginEmail(testEmail);
          setloginPass(testPass);
        }}  
      />
      <StatusBar style="auto" />
    </View>
    )


  return (
    <View style={styles.container}>
      <Text>Home page</Text>
      <Text>Welcome {user}</Text>

      <Button
      title='Sign Out'
        onPress = {() => {
          logOut();
          setuser();
        }}  
      />
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    backgroundColor: 'blue',
    paddingTop: '5px',
    paddingLeft: '10px'
  }
});
