// ImageInput.tsx
import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

interface ImageInputProps {
  onChange: (imageUri: string) => void;
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
        onChange(uri); // 선택한 이미지 URI를 부모 컴포넌트로 전달
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
