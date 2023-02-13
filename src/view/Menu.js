import React from 'react';
import {View, SafeAreaView} from 'react-native';
import Button from '../component/Button';

const Menu = ({navigation}) => {
    
    const  {styleView} = styles;

  const onBluetooth = () => {
    console.log('Bluetooth');
    navigation.navigate('Bluetooth');
  };

  const onOcr = () => {
    console.log('Ocr');
    navigation.navigate('Ocr')
  }

  return (
    <SafeAreaView>
      <View style={styleView}>
        <Button onPress={() => onBluetooth()}>Bluetooth</Button>
        <Button onPress={() => onOcr()}>Ocr</Button>
      </View>
    </SafeAreaView>
  );
};

const styles = {
    styleView: {
        alignItems: 'center',
        margin: 10
    }
}

export default Menu;
