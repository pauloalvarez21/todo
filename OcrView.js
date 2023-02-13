import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Dimensions, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Button from '../../components/Button';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Input from '../../components/Input';
import { SelectList } from 'react-native-dropdown-select-list';
import { dataPago, dataArea } from '../../constants/data.js';
import AutoHeightImage from 'react-native-auto-height-image';
import COLORS from '../../constants/colors';
import { DIMENSIONS } from '../../constants/dimensions';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window')

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mir.', 'Jue.', 'Vin.', 'Sab.']
};
LocaleConfig.defaultLocale = 'es';

const Ocr = ({ navigation }) => {

  const [imageUri, setImageUri] = useState(null);
  const [textImage, setTextImage] = useState(null);
  const [imagePathResize, setImagePathResize] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fecha, setFecha] = useState();
  const [maxDate, setMaxDate] = useState();
  const [funcionario, setFuncionario] = useState(null);
  const [documento, setDocumento] = useState(null);
  const [pago, setPago] = useState(null);
  const [area, setArea] = useState(null);
  const [iva, setIva] = useState(null);
  const [total, setTotal] = useState(null);
  const [comercio, setComercio] = useState(null);
  const [showModalMenu, setShowModalMenu] = useState(false);
  const {t, i18} = useTranslation();

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    setMaxDate(year + '-' + month + '-' + date);
  });

  const { textStyle, bodyStyle, componentStyle, imageStyle, calendarStyle,
    selectStyle, selectListStyle, textBoxStyle, backColor, viewStyle,
    viewStylesModal, componentStyleModal } = styles;

  const onTomarFoto = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
        cameraType: 'back'
      },
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        Alert.alert(
          '',
          t("youcanceledthetakephotooperation"),
          [
            { text: t("ok") },
          ],
          { cancelable: false }
        );
      } else if (response.error) {
        Alert.alert(
          t("error"),
          t("anerroroccurred") + ' ' + response.error,
          [
            { text: t("ok") },
          ],
          { cancelable: false }
        );
      } else if (response.customButton) {
        Alert.alert(
          t("error"),
          '' + response.customButton,
          [
            { text: t("ok") },
          ],
          { cancelable: false }
        );
      } else {
        const source = response.assets[0].uri
        setImageUri(source);

        LeerFactura(source);
      }
    });
  };

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
          '',
          t("youcanceledtheimageuploadoperation"),
          [
            { text: t("ok") },
          ],
          { cancelable: false }
        );
      } else if (response.error) {
        Alert.alert(
          t("error"),
          t("anerroroccurred") + ' ' + response.error,
          [
            { text: t("ok") },
          ],
          { cancelable: false }
        );
      } else if (response.customButton) {
        Alert.alert(
          t("error"),
          '' + response.customButton,
          [
            { text: t("ok") },
          ],
          { cancelable: false }
        );
      } else {
        const source = response.assets[0].uri
        setImageUri(source);

        LeerFactura(source);

      }
    }, setImageUri);
  };

  const LeerFactura = async (source) => {

    const result = await TextRecognition.recognize(source);

    ImageResizer.createResizedImage(source, DIMENSIONS.eight_hundred, DIMENSIONS.six_hundred, DIMENSIONS.format, DIMENSIONS.eighty, DIMENSIONS.two_hundred_seventy)
      .then(({ uri }) => {
        setImagePathResize(uri);
      }).catch((error) => {
        Alert.alert(
          t("error"),
          '' + error,
          [
            { text: t("ok") },
          ],
          { cancelable: false }
        );
      });

    console.log(result.text);

    try {
      setComercio(result.blocks[DIMENSIONS.one].text);
      let reIva = result.blocks[DIMENSIONS.ten].text.replace("$", "");
      reIva = reIva.replace(" ", "");
      //reIva = reIva.replace("\n ", "");
      setIva(reIva);
      let reTotal = result.blocks[DIMENSIONS.eleven].text.replace(" ", "");
      reTotal = reTotal.replace("S", "");
      reTotal = reTotal.replace(".", "");
      //setTotal(result.blocks[DIMENSIONS.eleven].text);
      setTotal(reTotal);
      setTextImage(result.text);
    } catch (err) {
      console.log(err);
    }

  }

  const onBack = () => {
    navigation.goBack();
  };

  const onModal = (bool) => {
    setShowModalMenu(bool);
  };

  const onLogin = () => {
    navigation.navigate('Login')
  }

  const onEnviarInfo = () => {
    setArea('');
    setComercio('');
    setDocumento('');
    setFecha(null);
    setFuncionario('');
    setImagePathResize(null);
    setImageUri(null);
    setPago('');
    setIva('');
    setFecha(null);
    setTotal('');
    Alert.alert(
      t("success"),
      t("theinformationprovidedissent"),
      [
        { text: 'OK' },
      ],
      { cancelable: false }
    );
  }

  return (
    <ScrollView style={bodyStyle}>
      <View style={backColor}>
        <View style={viewStyle}>

          <TouchableOpacity
            onPress={onBack}
          >
            <AutoHeightImage
              width={50}
              source={require('../../assets/images/atras.png')} />
          </TouchableOpacity>

          <AutoHeightImage
            width={200}
            source={require('../../assets/images/logo_blanco.png')} />
          <TouchableOpacity
            onPress={() => onModal(true)}
          >
            <AutoHeightImage
              width={50}
              source={require('../../assets/images/menu.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={showModalMenu}
        animationType="fade"
        transparent={true}
        onRequestClose={() => onModal(false)}>

        <View style={viewStylesModal}>
          <View style={componentStyleModal}>
            <Button block light
              onPress={() => onLogin()}>
              <Text>{t("sIGNOFF")}</Text>
            </Button>
          </View>
          <View style={componentStyleModal}>
            <Button block light
              onPress={() => onModal(false)}>
              <Text>    {t("X")}   </Text>
            </Button>
          </View>

        </View>

      </Modal>
      <View style={componentStyle}>
        <Button block light
          onPress={() => onTomarFoto()}>
          <Text>{t("takephoto")}</Text>
        </Button>
      </View>
      <View style={componentStyle}>
        <Button block light
          onPress={() => onGaleriaFoto()}>
          <Text>{t("galleryimage")}</Text>
        </Button>
        <View style={imageStyle}>
          {
            imageUri != null ? <AutoHeightImage source={{ uri: imageUri }}
              width={width / 8} /> : null
          }

        </View>
      </View>
      <View style={componentStyle}>
        <Button block light
          onPress={() => setShowModal(true)}>
          <Text>{t("expendituredate")} {fecha}</Text>
        </Button>
        <Modal visible={showModal} animationType="fade">
          <Calendar style={calendarStyle}
            maxDate={maxDate}
            onDayPress={date => {
              console.log(date)
              setFecha(date.dateString);
              setShowModal(false);
            }} />
        </Modal>
        <View>
          <Input
            placeholder={t("officialname")}
            keyboardType={'default'}
            onChangeText={setFuncionario}
            style={textStyle}
            value={funcionario}
            placeholderTextColor={COLORS.white}
          />
        </View>
        <View>
          <Input
            placeholder={t("documentNo")}
            keyboardType={'numeric'}
            onChangeText={setDocumento}
            style={textStyle}
            value={documento}
            placeholderTextColor={COLORS.white}
          />
        </View>
        <View>
          <Input
            placeholder={t("trade")}
            keyboardType={'default'}
            onChangeText={setComercio}
            value={comercio}
            style={textStyle}
            placeholderTextColor={COLORS.white}
          />
        </View>
        <View>
          <Input
            placeholder={t("vat")}
            keyboardType={'numeric'}
            onChangeText={setIva}
            style={textStyle}
            value={iva}
            placeholderTextColor={COLORS.white}
          />
        </View>
        <View>
          <Input
            placeholder={t("total")}
            keyboardType={'numeric'}
            onChangeText={setTotal}
            style={textStyle}
            value={total}
            placeholderTextColor={COLORS.white}
          />
        </View>
        <View style={selectListStyle}>
          <SelectList
            setSelected={(val) => setPago(val)}
            data={dataPago}
            save={pago}
            search={false}
            placeholder={t("paymenttype")}
            boxStyles={selectStyle}
            dropdownTextStyles={textStyle}
            dropdownStyles={{ backgroundColor: COLORS.white }}
            inputStyles={textBoxStyle}
          />
        </View>
        <View style={selectListStyle}>
          <SelectList
            setSelected={(val) => setArea(val)}
            data={dataArea}
            save={area}
            search={false}
            placeholder={t("area")}
            boxStyles={selectStyle}
            dropdownTextStyles={textStyle}
            dropdownStyles={{ backgroundColor: COLORS.white }}
            inputStyles={textBoxStyle}
          />
        </View>
        <View style={componentStyle}>
          <Button block light
            onPress={() => onEnviarInfo()}>
            <Text>{t("sendinformation")}</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  bodyStyle: {
    flex: DIMENSIONS.one,
    backgroundColor: COLORS.blue
  },
  componentStyle: {
    marginLeft: DIMENSIONS.fifty,
    marginRight: DIMENSIONS.fifty,
    marginTop: DIMENSIONS.twenty,
    justifyContent: 'center',
  },
  selectListStyle: {
    marginLeft: DIMENSIONS.ten,
    marginRight: DIMENSIONS.ten,
    marginTop: DIMENSIONS.twenty
  },
  imageStyle: {
    marginLeft: DIMENSIONS.fifty,
    marginRight: DIMENSIONS.fifty,
    marginTop: Dimensions.twenty,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: COLORS.blue,
  },
  calendarStyle: {
    borderRadius: DIMENSIONS.ten,
    elevation: DIMENSIONS.four,
    margin: DIMENSIONS.forty
  },
  selectStyle: {
    backgroundColor: COLORS.white,
    color: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBoxStyle: {
    color: COLORS.blue,
    alignItems: 'center'
  },
  backColor: {
    backgroundColor: COLORS.grey
  },
  viewStyle: {
    backgroundColor: COLORS.grey,
    justifyContent: 'center',
    alignItems: 'center',
    padding: DIMENSIONS.ten,
    marginTop: DIMENSIONS.forty,
    flexDirection: "row",
    justifyContent: 'space-between',
  },

  viewStylesModal: {
    backgroundColor: COLORS.white,
    width: width - DIMENSIONS.six_hundred,
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: DIMENSIONS.ten,
    marginTop: DIMENSIONS.hundred_ten,
  },
  componentStyleModal: {
    marginLeft: DIMENSIONS.fifty,
    marginRight: DIMENSIONS.fifty,
    marginTop: DIMENSIONS.forty
  },
}

export default Ocr;