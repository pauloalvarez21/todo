import React from 'react';
import { View, Text, Switch} from 'react-native';

const Toggle = (props) => {

    const {container, text, switchi} = styles;

    return(
        <View style={container}>
            <Text style={text}>ON</Text>
            <Switch style={switchi} value={props.value}
                onValueChange={props.onValueChange}/>
        </View>
    )
}

const styles = {
    container: {
        paddingVertical: 15,
        flexDirection: 'row'
    },
    text: {
        fontWeight: 'bold',
        fontSize:20,
        flex:1
    },
    switchi: {
        with: 50
    }
}

export default Toggle;