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

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePhoto() {
    
  }

  return (
    <View style={styles.container}>
     <Text>Gallery Page</Text>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center'
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
