import React from 'react';
import {View, Text, FlatList} from 'react-native';

const BluetoothFlatlist = () => {
    
    const data = [
        {
            name: 'El uno'
        },
        {
            name: 'El dos'
        }
    ]

  return (
    <FlatList
        data={data}
        keyExtractor={(id, index) => index.toString()}
        renderItem={({item}) => <Text> {item.name}</Text>}
    />
  );
};


export default BluetoothFlatlist;