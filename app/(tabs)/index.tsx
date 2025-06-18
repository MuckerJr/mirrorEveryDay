import { IconSymbol } from "@/app-example/components/ui/IconSymbol";
import { Camera, CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Index() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [photoUri, setPhotoUri] = useState<string | null>(null); // to display the photo
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null); // Reference for cameraView
  if(!permission) {
    // Camera permissions are loading
    return <View />;
  }

  if(!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePhoto() {
    if(cameraRef.current) {
      try {
        // Take the photo
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8, 
          base64: false,
          skipProcessing: false,
        });
        console.log('photo taken: ', photo)
        if(photo) {
          setPhotoUri(photo.uri)
        }
      } catch (error) {
        console.error("Error taking photo: ", error)
      }
    }
  }

  function retakePhoto() {setPhotoUri(null)};

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.imageContainer}>
        <Image source={{ uri: photoUri }} style={styles.image} />
        <Button title="Retake Photo" onPress={retakePhoto} />
      </View>
      ):(
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.flipButtonContainer}>
            <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
              <IconSymbol size={28} name='arrow.trianglehead.2.clockwise.rotate.90' color={'white'} />
            </TouchableOpacity>
          </View>
          <View style={styles.shutterButtonContainer}>
            <TouchableOpacity style={styles.shutterButton} onPress={takePhoto}>
              <IconSymbol size={56} name='camera.circle' color={'white'} />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
        
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center'
  }, 
  camera: {
    flex:1
  },
  flipButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 32,
  },
  shutterButtonContainer:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 32,
  },
  flipButton: {
    flex:1,
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
  }, 
  shutterButton: {
    flex:1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  imageContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
})
