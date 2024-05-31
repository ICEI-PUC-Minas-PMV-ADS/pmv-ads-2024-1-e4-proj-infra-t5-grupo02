import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Financeiro() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  return (
    <ImageBackground
      source={require("../assets/back1.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>

      <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar..."
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity style={styles.searchIconContainer}>
            <Image
              source={require("../assets/search.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>


        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate('Home')}
          >
            <View style={styles.iconCircle}>
              <Icon name="home" size={30} color="white" />
            </View>
            <Text style={styles.iconText}>Home</Text>
          </TouchableOpacity>

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "80%",
    height: 100,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#503000',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
    color: '#503000',
  },
  searchIconContainer: {
    marginHorizontal: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "#503000",
    marginBottom: 35,
    marginTop: 35,
    marginLeft: 5,
    marginRight: 35,
  },
  image:{
    width: 30,
    height: 20,
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
