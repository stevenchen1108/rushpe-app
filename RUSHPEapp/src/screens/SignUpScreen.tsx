import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import type { AuthStackParamList } from "../navigation/AuthStack";

export default function SignUpScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 28, fontWeight: "700" }}>Create your account</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12, borderRadius: 10 }}
      />

      <TextInput
        placeholder="Password (6+ characters)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 12, borderRadius: 10 }}
      />

      <Pressable
        onPress={() => Alert.alert("Sign Up", "Hook Firebase here next.")}
        style={{ padding: 14, borderRadius: 12, borderWidth: 1, alignItems: "center" }}
      >
        <Text style={{ fontWeight: "600" }}>Create Account</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("SignIn")} style={{ marginTop: 8 }}>
        <Text>Already have an account? Sign in</Text>
      </Pressable>
    </View>
  );
}