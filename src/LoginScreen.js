import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image, Keyboard } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    Keyboard.dismiss(); // Dismiss the keyboard when the login button is pressed

    if (username === 'user' && password === 'pass') {
      // Successful login logic here
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  const handleSignUp = () => {
    // Replace this with your registration logic
    console.log('User signed up:', username);
    setErrorMessage('Registration successful!');
  };

  const handlePasswordRecovery = () => {
    // Add your password recovery logic here
    console.log('Password recovery initiated for:', username);
    // You can implement the password recovery logic as needed, such as sending a reset email.
    // If successful, you can set a message or navigate to a password recovery screen.
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../image/logo1.png')} // Replace with the actual image file path
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="ID"
        onChangeText={text => setUsername(text)}
        value={username}
        keyboardType="email-address" // Use the email address keyboard type for ID
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
        keyboardType="default" // Use the default keyboard type for the password
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.passwordRecoveryButton, { backgroundColor: 'transparent' }]} onPress={handlePasswordRecovery}>
          <Text style={[styles.passwordRecoveryButtonText, { color: 'black' }]}>비밀번호찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.signupButton, { backgroundColor: 'transparent' }]} onPress={handleSignUp}>
          <Text style={[styles.signupButtonText, { color: 'black' }]}>회원가입</Text>
        </TouchableOpacity>
      </View>
      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    width: '75%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: 'darkblue',
    borderRadius: 5,
    paddingVertical: 14,  //버튼 세로
    paddingHorizontal: 70,  //버튼 가로
    marginTop: 10,  //버튼 윗쪽 마진
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupButton: {
    backgroundColor: 'darkblue',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 1,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  passwordRecoveryButton: { // Added missing colon here
    backgroundColor: 'darkblue',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 1,
  },
  passwordRecoveryButtonText: { // Added missing colon here
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // 가운데로 정렬
    width: '100%',
    marginTop: 10,
    marginHorizontal: 3, // 가로 간격 조정
  },
});

export default LoginScreen;