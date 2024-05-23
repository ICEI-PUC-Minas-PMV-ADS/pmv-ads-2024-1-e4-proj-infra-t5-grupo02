import React from 'react';
import { SafeAreaView, Text, Image} from 'react-native';
import { Button } from '@rneui/themed';
import { styles } from './styles';

export const Home = () => {

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require('../../../assets/images/easyrent.png')}
        />
        <Text>Home</Text>
      </SafeAreaView>
    </>
  );
};

