import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {

    const { buttonStyle, textStyle } = styles;

    return(
        <TouchableOpacity
            onPress = {onPress}
            style={buttonStyle}
        >
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {

    textStyle: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        //fontFamily: Fonts.CHOWFUN_,
        fontSize: 20
    },

    buttonStyle: {
        backgroundColor: "#841584",
        borderWidth: 1,
        borderColor: '#841584',
        width: 250,
        marginBottom: 10,
    }
};

export default Button;