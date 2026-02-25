import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import type { AuthStackParamList } from "../navigation/AuthStack";

export default function LandingScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 12 }}>
      <Image
        source = {require("../../assets/images/shpeLogo.png")}
        style = {{
            width: 150,
            height: 150,
            resizeMode: "contain",
            alignSelf: "center",
            marginBottom: 20,
        }}
      />
      <Text style={{ fontSize: 34, fontWeight: "700", alignSelf: "center", }}>Society Of Hispanic</Text>
      <Text style={{ fontSize: 34, fontWeight: "700", alignSelf: "center", }}>Engineers</Text>
      <Text style={{ fontSize: 16, opacity: 0.8 , alignSelf: "center"}}>
        Welcome!
      </Text>

      <View style={{ height: 24 }} />

      <Pressable
        onPress={() => navigation.navigate("SignIn")}
        style={{ padding: 14, borderRadius: 12, borderWidth: 1, alignItems: "center" }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Sign In</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("SignUp")}
        style={{ padding: 14, borderRadius: 12, borderWidth: 1, alignItems: "center" }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Create Account</Text>
      </Pressable>
    </View>
  );
}