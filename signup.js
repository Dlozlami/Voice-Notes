import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { insertUser } from "./database";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    insertUser(email, password, (userId) => {
      if (userId) {
        alert("Account created successfully. Please log in.");
        navigation.navigate("Login");
      } else {
        alert("Error creating account. Please try again.");
      }
    });
  };

  return (
    <View>
      <Text>Sign Up</Text>
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
      <Button title="Sign Up" onPress={handleSignup} />
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default Signup;
