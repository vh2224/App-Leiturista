import React, { useState, useEffect, useRef } from 'react';
import { Image, Modal, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import styles from "../../Style";

export default function UseCam({CloseModalPhoto, dataForm}) {
  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [hasPermissionMedia, setHasPermissionMedia] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [captured, setCaptured] = useState(null);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      let { statusMedia } = await MediaLibrary.requestPermissionsAsync();
      setHasPermissionMedia(statusMedia === 'granted');

      let { statusLoc }  = await Location.requestForegroundPermissionsAsync();
      if (statusLoc !== 'granted') {
        setErrorMsg('Permissão negada');
      }
    })
    ();
  }, []);
  

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Permissão Negada</Text>;
  }

  async function take() {
    if (ref) {
      const opt = {
        quality: 0.8,
        flexOrientation: true,
        forceUpOrientation: true,
      }
      saveLocation();
      const data = await ref.current.takePictureAsync(opt);
      setCaptured(data.uri)
      setOpen(true)
      renameFilePhoto(dataForm)
      
    }
  }

  async function saveLocation() {
    
    let actualLocation = await Location.getCurrentPositionAsync({});
    setLocation(actualLocation.coords);
    
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  }

  async function renameFilePhoto(dataForm) {

    console.log(dataForm);

    console.log(dataForm.matricula, dataForm.codigo, dataForm.situacao);

    const asset = await StorageAccessFramework.createFileAsync(captured, `${dataForm.matricula}/${dataForm.codigo}/${dataForm.situacao}`, '.jpg');

    console.log(asset);

    await MediaLibrary.saveToLibraryAsync(asset);

  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
              <Text>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTake}
            onPress={take}>
            <Text>Take</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Modal transparent={true} visible={open} >
        <View style={styles.contentPhoto}>
          <View style={styles.contentPhotoButton}>
            <TouchableOpacity style={styles.buttonClose} onPress={() => setOpen(false)}>
              <Text>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonConfirm} onPress={CloseModalPhoto}>
              <Text>Confirmar</Text>
            </TouchableOpacity>
          </View>
          <Image style={styles.img} source={{ uri: captured }} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}