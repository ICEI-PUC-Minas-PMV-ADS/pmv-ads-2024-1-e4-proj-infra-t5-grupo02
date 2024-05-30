import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Financeiro from "./financeiro";
import Inquilinos from "./inquilinos";

export default function Home() {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserName = async () => {
      const userName = await AsyncStorage.getItem('@USER_NAME');
      setName(userName);
    };
    fetchUserName();
  }, []);

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require("../assets/back1.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>

      <View style={styles.signout}>
          <TouchableOpacity onPress={logout}>
            <Icon name="sign-out" size={35} color="#503000" />
            <Text>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Text style={styles.text}>Olá, <Text style={styles.textName}>{name} 😃</Text></Text>
          <Text style={styles.text}>esperamos que estejas bem</Text>
          <Image source={require("../assets/easyrent(1).png")} style={styles.image} />
          <Text style={styles.text}>Transformando a experiência de aluguel para locadores e inquilinos</Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate('Financeiro')}
          >
            <View style={styles.iconCircle}>
              <Icon name="dollar" size={30} color="white" />
            </View>
            <Text style={styles.iconText}>Financeiro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate('Inquilinos')}
          >
            <View style={styles.iconCircle}>
              <Icon name="users" size={30} color="white" />
            </View>
            <Text style={styles.iconText}>Inquilinos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  imageContainer: {
    alignItems: "center",
    alignSelf: 'center',
  },
  signout: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingRight: 20,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    paddingTop: 70,
    marginTop: 70,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#503000", 
    marginLeft: 35,
    marginRight: 35,
  },
  textName: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#503000",
    marginLeft: 35,
    marginRight: 35,
    paddingBottom: 0,
    marginBottom: 0,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "orange",
    height: 80,
    paddingBottom: 50,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#503000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 8,
  },
  iconText: {
    color: "#503000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
  },
});
