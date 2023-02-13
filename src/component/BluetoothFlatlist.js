import React from 'react';
import {View, Text, FlatList} from 'react-native';
import Toggle from './Toggle';

const BluetoothFlatlist = () => {
    
    const data = [
       
    ]

   
  return (
    <View>
    <Toggle/>
    <Text>Lista de Dispositivos</Text>
    <FlatList
        data={data}
        ListEmptyComponent={() => <Text style={{fontSize:20}}>No hay dispositivos</Text>  }
        keyExtractor={(id, index) => index.toString()}
        renderItem={({item}) => <Text> {item.name}</Text>}
    />
    </View>
  );
};


export default BluetoothFlatlist;