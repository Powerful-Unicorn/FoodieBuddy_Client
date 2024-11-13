import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

interface ImageInputProps {
  onChange: (imageUri: string, binaryData: ArrayBuffer) => void;
}

function ImageInput({onChange}: ImageInputProps) {
  const handleSelectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.8,
    });

    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) {
        const response = await fetch(uri);
        const binaryData = await response.arrayBuffer();

        onChange(uri, binaryData);
      }
    }
  };

  return (
    <TouchableOpacity onPress={handleSelectImage} style={styles.imageButton}>
      <MaterialIcons name="photo" size={30} color="gray" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageButton: {
    marginRight: 10,
  },
});

export default ImageInput;
