import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../constants';

interface ImageInputProps {
  onChange: (imageUri: string) => void; // string 타입을 받는 onChange로 수정
}

function ImageInput({onChange}: ImageInputProps) {
  const handleImageSelect = () => {
    const selectedImageUri = 'selected-image-uri'; // 실제 이미지를 선택하면 여기서 URI를 얻어옴
    onChange(selectedImageUri); // 상위 컴포넌트로 이미지 URI를 전달
  };

  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.imageInputPressed,
        styles.imageInput,
      ]}
      onPress={handleImageSelect} // 이미지 선택 시 handleImageSelect 호출
    >
      <MaterialIcons
        name="photo-size-select-actual"
        size={28}
        color={colors.GRAY_500}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageInput: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  imageInputPressed: {
    opacity: 0.5,
  },
  inputText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
});

export default ImageInput;
