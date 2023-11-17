import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { findUserByEmail } from "./database";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    findUserByEmail(email, (user) => {
      if (user && user.password === password) {
        // Successful login, navigate to the app's main screen.
        // You can replace 'MainScreen' with your actual main screen.
        navigation.navigate("MainScreen");
      } else {
        alert("Invalid email or password.");
      }
    });
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
};

export default Login;
