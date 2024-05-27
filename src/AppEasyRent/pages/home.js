import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/back1.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Text style={styles.text}>Seja Bem-vindo</Text>
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
            onPress={() => navigation.navigate('Imoveis')}
          >
            <View style={styles.iconCircle}>
              <Icon name="building" size={30} color="white" />
            </View>
            <Text style={styles.iconText}>Imóveis</Text>
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
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#503000",
    marginBottom: 35,
    marginTop: 35,
    marginLeft: 35,
    marginRight: 35,
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
