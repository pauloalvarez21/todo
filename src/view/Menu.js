import React from 'react';
import {View, Text} from 'react-native';
import Button from '../component/Button';

const Menu = ({navigation}) => {
    
    const  {styleView} = styles;

  const onBluetooth = () => {
    console.log('Entre')
    navigation.navigate('Bluetooth');
  };

  return (
    <View>
      <View style={styleView}>
        <Button onPress={() => onBluetooth()}>Bluetooth</Button>
      </View>
    </View>
  );
};

const styles = {
    styleView: {
        alignItems: 'center',
        margin: 10
    }
}

export default Menu;
