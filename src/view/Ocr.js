import React, {useState} from 'react';
import { View, Text, Alert, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Button from '../component/Button';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import ImageResizer from '@bam.tech/react-native-image-resizer';

const Ocr = () => {

  const [textImage, setTextImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [imagePathResize, setImagePathResize] = useState(null);

  const  {styleView, imageStyle} = styles;

  const onTakePhoto = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
        cameraType: 'back'
      },
      includeBase64: true,
    };

    launchCamera(options, response => {
      if(response.didCancel) {
        Alert.alert(
          '',
          'Usted Cancelo',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      } else if (response.error) {
        Alert.alert(
          'Error',
          response.error,
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      } else if (response.customButton) {
        Alert.alert(
          'Error',
          '' + response.customButton,
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      } else {
        const source = response.assets[0].uri
        setImageUri(source);
        console.log(source);
        leerFactura(source);
      }
    });
  }

  const onGaleriaFoto = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo'
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert(
          'Usted cancelo',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      } else if (response.error) {
        Alert.alert(
          '',
           response.error,
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      } else if (response.customButton) {
        Alert.alert(
          "Error",
          '' + response.customButton,
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      } else {
        const source = response.assets[0].uri
        setImageUri(source);
        console.log(source);
        leerFactura(source);

      }
    });
  }

  const leerFactura = async (source) => {

    const result = await TextRecognition.recognize(source);

    ImageResizer.createResizedImage(source, 800, 600,'PNG', 80, 270)
      .then(({ uri }) => {
        setImagePathResize(uri);
      }).catch((error) => {
        Alert.alert(
          "Error",
          '' + error,
          [
            { text: "OK" },
          ],
          { cancelable: false }
        );
      });

    console.log(result.text);

  }
  
    return (
      <View style={styleView}>
        <Button onPress={() => onTakePhoto()}>Tomar Foto</Button>
        <Button onPress={() => onGaleriaFoto()}>De la galeria</Button>
        {
            imageUri != null ? <Image style={imageStyle} source={{ uri: imageUri }}
              /> : null
          }
      </View>
    );
}

const styles = {
  styleView: {
      alignItems: 'center',
      margin: 10
  }, 
  imageStyle : {
    width: 500,
    height: 500
  }
}

export default Ocr;
