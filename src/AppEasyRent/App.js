import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, Image, Text, TextInput, Platform, KeyboardAvoidingView, ScrollView, ActivityIndicator, SafeAreaView } from "react-native";
import Input from "./components/Input";
import Button from "./components/Button";
import Home from "./pages/home";
import API from "./services/webapi.services.js";
import { LOGIN_URL } from "./services/urls.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Financeiro from "./pages/financeiro.js";
import Inquilinos from "./pages/inquilinos.js";
import { Alert } from 'react-native';

const PlaceholderImage = require("./assets/easyrent(1).png");
const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (email, senha) => {
    setLoading(true);
    try {
      const response = await API.post(`${LOGIN_URL}/api/Usuarios/authenticate`, { email, senha });
      console.log(response.data);
      await AsyncStorage.setItem('@USER_ID', JSON.stringify(response.data.id));
      await AsyncStorage.setItem('@USER_NAME', response.data.name);
      await AsyncStorage.setItem('@USER_PROFILE', response.data.profile);
      await AsyncStorage.setItem('@TOKEN_KEY', response.data.jwtToken);
      navigation.navigate("Home");
    } catch (error) {
      console.log('Server responded with status code:', error.response?.status);
      console.log('Response data:', error.response?.data);
      console.log(error);
      Alert.alert(
        "Atenção!",
        "Por favor, verifique seu e-mail e senha e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={PlaceholderImage} style={styles.image} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>E-Mail</Text>
          <Input style={styles.input} placeholder="Digite seu email" value={email} onChangeText={setEmail} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha</Text>
          <Input style={styles.input} placeholder="Digite sua senha" secureTextEntry value={senha} onChangeText={setSenha} />
        </View>

        <View style={styles.buttonContainer}>
          {loading ? (
            <>
            <Text> carregando...</Text>
            <ActivityIndicator size="large" color="#0000ff" />
            </>
          ) : (
            <Button label="Entrar" onPress={() => login(email, senha)} />
          )}
        </View>

        <View style={styles.footer}>
          <Image style={styles.backgroundImage} source={require("./assets/back1.png")} resizeMode="cover" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default function App() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const profile = await AsyncStorage.getItem('@USER_PROFILE');
      setUserProfile(profile);
    };
    getUserProfile();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Financeiro">
          {props => <Financeiro {...props} userProfile={userProfile} />}
        </Stack.Screen>
        <Stack.Screen name="Inquilinos" component={Inquilinos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: "orange",
    borderWidth: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: "center",
    paddingVertical: 20,
  },
  imageContainer: {
    width: 350,
    height: 300,
    resizeMode: "contain",
    marginLeft: 50,
    marginTop: 30,
  },
  image: {
    width: 300,
    height: 300,
  },
  inputContainer: {
    width: "80%",
    marginTop: 5,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    marginTop: 5,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 7,
      },
    }),
    backgroundColor: "white",
    padding: 10,
    borderRadius: 17,
    borderColor: "orange",
    borderWidth: 2,
  },
  inputLabel: {
    marginBottom: 5,
    color: "#bb3e03",
    fontWeight: "bold",
    textAlign: "left",
  },
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    marginTop: 10,
  },
  footer: {
    width: "100%",
    height: "15%",
    resizeMode: "cover",
  },
  backgroundImage: {
    width: "130%",
    height: "110%",
    resizeMode: "cover",
    position: "static",
  },
});
