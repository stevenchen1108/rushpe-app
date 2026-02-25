import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import type { AuthStackParamList } from "../navigation/AuthStack";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 12, backgroundColor: "#212121" }}>
      <Image
        source = {require("../../assets/images/shpeLogo.png")}
        style = {{
            width: 150,
            height: 150,
            resizeMode: "contain",
            alignSelf: "center",
            transform: [{translateY: -50}],
        }}
      />
      <Text style={{ fontSize: 34, fontWeight: "700", alignSelf: "center", color: "white", transform: [{translateY: -25}]}}>Society Of Hispanic</Text>
      <Text style={{ fontSize: 34, fontWeight: "700", alignSelf: "center", color: "white", transform: [{translateY: -20}]}}>Engineers</Text>
      <Text style={{ fontSize: 16, opacity: 0.8 , alignSelf: "center", color: "#A8A8A8", transform: [{translateY: 5}]}}>
        Welcome!
      </Text>

      <View style={{ height: 24 }} />

      <Pressable
        onPress={() => navigation.navigate("SignIn")}
        style={({pressed}) => ({
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
          backgroundColor: pressed ? "#8B0000" : "#D21034",
        })}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>Sign In</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("SignUp")}
        style={({pressed}) => ({
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
          backgroundColor: pressed ? "#8B0000" : "#D21034",
        })}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>Create Account</Text>
      </Pressable>
    </View>
  );
}