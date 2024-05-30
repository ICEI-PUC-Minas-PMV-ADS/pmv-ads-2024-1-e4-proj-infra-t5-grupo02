import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Image, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../services/webapi.services.js";
import { INQUILINOS_URL } from "../services/urls.js";

export default function Financeiro() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [inquilinoData, setInquilinoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchInquilinos = async () => {
      try {
        const token = await AsyncStorage.getItem('@TOKEN_KEY');
        const response = await API.get(`${INQUILINOS_URL}/api/Inquilinos/all`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const sortedData = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
        setInquilinoData(sortedData);
        setFilteredData(sortedData);
        console.log("Inquilinos Data:", sortedData);
      } catch (error) {
        console.error('Erro ao buscar inquilinos:', error);
      }
    };

    fetchInquilinos();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredData(inquilinoData);
    } else {
      const filtered = inquilinoData.filter(inquilino =>
        inquilino.nome.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [search, inquilinoData]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text><Text style={styles.bold}>Endereço:</Text> {item.endereco}</Text>
      <Text><Text style={styles.bold}>Cidade:</Text> {item.cidade}</Text>
      <Text><Text style={styles.bold}>Estado:</Text> {item.estado}</Text>
      <Text><Text style={styles.bold}>CEP:</Text> {item.cep}</Text>
      <Text><Text style={styles.bold}>CPF:</Text> {item.cpf}</Text>
      <Text><Text style={styles.bold}>Telefone:</Text> {item.telefone}</Text>
      <Text><Text style={styles.bold}>E-mail:</Text> {item.email}</Text>
      <Text><Text style={styles.bold}>Observação:</Text> {item.observacao}</Text>
    </View>
  );

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

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate('Home')}
          >
            <View style={[styles.iconCircle]}>
              <Icon name="home" size={navigation.isFocused() ? 30 : 30} color="white" />
            </View>
            <Text style={styles.iconText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate('Financeiro')}
          >
            <View style={[styles.iconCircle]}>
              <Icon name="dollar" size={navigation.isFocused() ? 30 : 30} color="white" />
            </View>
            <Text style={styles.iconText}>Financeiro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate('Inquilinos')}
          >
            <View style={[styles.iconCircle, navigation.isFocused() && styles.selectedIconCircle]}>
              <Icon name="users" size={navigation.isFocused() ? 35 : 30} color="white" />
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
    height: 80,
    paddingHorizontal: 5,
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
  image: {
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
    position: 'relative',
    bottom: 0,
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "orange",
    height: 80,
    paddingBottom: 50,
    marginTop: 15,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "white",
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
  selectedIconCircle: {
    borderWidth: 3,
    borderColor: "orange",
    width: 60,
    height: 60,
  },
  iconText: {
    color: "#503000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#503000",
  },
  text: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
});
