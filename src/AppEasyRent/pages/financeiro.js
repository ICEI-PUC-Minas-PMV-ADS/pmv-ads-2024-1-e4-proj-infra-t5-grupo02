import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Image, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../services/webapi.services.js";
import { FINANCEIRO_URL, INQUILINOS_URL } from "../services/urls.js";

export default function Financeiro() {
    const [search, setSearch] = useState("");
    const [financeiroData, setFinanceiroData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [inquilinosMap, setInquilinosMap] = useState({});
    const [profile, setProfile] = useState();
    const [usuarioId, setUsuarioId] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchInquilinos = async () => {
            try {
                const userId = await AsyncStorage.getItem('@USER_ID');
                setUsuarioId(userId)
                const token = await AsyncStorage.getItem('@TOKEN_KEY');
                const userProfile = await AsyncStorage.getItem('@USER_PROFILE');
                setProfile(userProfile);
                const response = await API.get(`${INQUILINOS_URL}/api/Inquilinos/all`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const map = {};
                const esteUsuario = parseInt(userId)
                response.data.forEach(inquilino => {
                  // if (esteUsuario == inquilino.id) {
                  //   map[inquilino.id] = inquilino.nome;
                  // }
                  map[inquilino.id] = inquilino.nome;
                });
                setInquilinosMap(map);
                console.log("Inquilinos Map:", map);
            } catch (error) {
                console.error('Erro ao buscar inquilinos:', error);
            }
        };

        const fetchFinanceiroData = async () => {
            try {
                const userId = await AsyncStorage.getItem('@USER_ID');
                setUsuarioId(userId)
                const token = await AsyncStorage.getItem('@TOKEN_KEY');
                const response = await API.get(`${FINANCEIRO_URL}/api/Lancamentos/all`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                setFinanceiroData(response.data);
                setFilteredData(response.data);
                
            } catch (error) {
                console.error('Erro ao buscar dados financeiros:', error);
            }
        };

        fetchInquilinos();
        fetchFinanceiroData();
    }, []);

    useEffect(() => {
        if (search === "") {
            setFilteredData(financeiroData);
        } else {
            const filtered = financeiroData.filter(item =>
                item.descricao.toLowerCase().includes(search.toLowerCase()) ||
                (inquilinosMap[item.inquilino] && inquilinosMap[item.inquilino].toLowerCase().includes(search.toLowerCase()))
            );
            setFilteredData(filtered);
        }
    }, [search, financeiroData, inquilinosMap]);

    const renderItem = ({ item }) => {
      const valorFormatado = parseFloat(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR');
      const tipoEstilo = item.tipo === 'despesa' ? styles.despesa : styles.receita;
      const nomeInquilino = inquilinosMap[item.inquilino] || 'Sem inquilino';

      console.log(profile)
      if (profile == 'inquilino') {
        if (item.inquilino == usuarioId) {
          console.log(`Item: ${item.inquilino}`)
          return (
            <View style={styles.card}>
                <Text style={styles.title}>{item.descricao}</Text>
                <Text><Text style={styles.bold}>Valor:</Text> {valorFormatado}</Text>
                <Text><Text style={styles.bold}>Status:</Text> {item.status}</Text>
                <Text><Text style={styles.bold}>Inquilino:</Text> {nomeInquilino}</Text>
                <Text><Text style={styles.bold}>Vencimento:</Text> {dataFormatada}</Text>
                <Text style={tipoEstilo}><Text style={styles.bold}>Tipo:</Text> {item.tipo}</Text>
                <Text><Text style={styles.bold}>Forma pagamento:</Text> {item.forma}</Text>
            </View>
          );
        }
      } else {
        return (
          <View style={styles.card}>
              <Text style={styles.title}>{item.descricao}</Text>
              <Text><Text style={styles.bold}>Valor:</Text> {valorFormatado}</Text>
              <Text><Text style={styles.bold}>Status:</Text> {item.status}</Text>
              <Text><Text style={styles.bold}>Inquilino:</Text> {nomeInquilino}</Text>
              <Text><Text style={styles.bold}>Vencimento:</Text> {dataFormatada}</Text>
              <Text style={tipoEstilo}><Text style={styles.bold}>Tipo:</Text> {item.tipo}</Text>
              <Text><Text style={styles.bold}>Forma pagamento:</Text> {item.forma}</Text>
          </View>
        );
      }
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
                <View style={[styles.iconCircle, navigation.isFocused() && styles.selectedIconCircle]}>
                <Icon name="dollar" size={navigation.isFocused() ? 35 : 30} color="white" />
                </View>
                <Text style={styles.iconText}>Financeiro</Text>
            </TouchableOpacity>

            {
              profile != "inquilino" && <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate('Inquilinos')}
              >
                <View style={[styles.iconCircle]}>
                <Icon name="users" size={navigation.isFocused() ? 30 : 30} color="white" />
                </View>
                <Text style={styles.iconText}>Inquilinos</Text>
              </TouchableOpacity>
            }
          
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
      width: 55,
      height: 55,
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
      width: 70,
      height: 70,
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
      fontSize: 15,
    },
    despesa: {
      fontSize: 15,
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
  