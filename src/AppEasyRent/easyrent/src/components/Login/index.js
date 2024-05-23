import React from 'react';
import { SafeAreaView, Text, Image, TextInput, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import { styles } from './styles';
import { Home } from '../Home'

export const Login = () => {

  const [text, onChangeText] = React.useState('seuemail@exemplo.com');
  const [password] = React.useState('sua senha');

  return (
    <>

      <SafeAreaView style={styles.container}>
        <Image
          style={styles.Logo}
          source={require('../../../assets/images/easyrentLogo.png')}
        />
        <Text style={styles.texto}>E-mail</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Text style={styles.texto}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          keyboardType="numeric"
        />
        <Button
              title="Entrar"
              onPress={() => Alert.alert('Entrando...')}
              //onPress={ Home }
              buttonStyle={{
                backgroundColor: '#e1570a',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
                width: 150,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
            />
      </SafeAreaView>
    </>
  );
};