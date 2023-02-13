import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Button from '../component/Button';
import BluetoothFlatlist from '../component/BluetoothFlatlist';

const Bluetooth = ({navigation}) => {
    
  
  return (
    <SafeAreaView>
      <BluetoothFlatlist/>
      </SafeAreaView>
  );
};


export default Bluetooth;