import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Image, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../services/webapi.services.js";
import { FINANCEIRO_URL } from "../services/urls.js";

export default function Financeiro() {
    const [search, setSearch] = useState("");
    const [financeiroData, setFinanceiroData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchFinanceiroData = async () => {
            try {
                const token = await AsyncStorage.getItem('@TOKEN_KEY');
                const response = await API.get(`${FINANCEIRO_URL}/api/Lancamentos/all`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setFinanceiroData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados financeiros:', error);
            }
        };

        fetchFinanceiroData();
    }, []);

    const renderItem = ({ item }) => {
      const valorFormatado = parseFloat(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR');
      const tipoEstilo = item.tipo === 'despesa' ? styles.despesa : styles.receita;

      return (
        <View style={styles.card}>
        <Text style={styles.title}>{item.descricao}</Text>
        <Text><Text style={styles.bold}>Valor:</Text> {valorFormatado}</Text>
        <Text><Text style={styles.bold}>Status:</Text> {item.status}</Text>
        <Text><Text style={styles.bold}>Inquilino:</Text> {item.inquilino}</Text>
        <Text><Text style={styles.bold}>Vencimento:</Text> {dataFormatada}</Text>
        <Text style={tipoEstilo}><Text style={styles.bold}>Tipo:</Text> {item.tipo}</Text>
        <Text><Text style={styles.bold}>Forma pagamento:</Text> {item.forma}</Text>
    </View>
      );
  };

    return (
        <ImageBackground source={require("../assets/back1.png")} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquisar..."
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                    <TouchableOpacity style={styles.searchIconContainer}>
                        <Image source={require("../assets/search.png")} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={financeiroData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
                        <View style={styles.iconCircle}>
                            <Icon name="home" size={30} color="white" />
                        </View>
                        <Text style={styles.iconText}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Financeiro')}>
                        <View style={styles.iconCircle}>
                            <Icon name="dollar" size={30} color="white" />
                        </View>
                        <Text style={styles.iconText}>Financeiro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Imoveis')}>
                        <View style={styles.iconCircle}>
                            <Icon name="building" size={30} color="white" />
                        </View>
                        <Text style={styles.iconText}>Imóveis</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Inquilinos')}>
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
  despesa: {
      fontSize: 16,
      color: 'red',
  },
  receita: {
      fontSize: 16,
      color: 'green',
  },
  bold: {
      fontWeight: 'bold',
  },
});
