// MessageInput.tsx
import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import ImageInput from './ImageInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../constants';

interface MessageInputProps {
  onSend: (message: string, imageUri: string | null) => void;
}

function MessageInput({onSend}: MessageInputProps) {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageInput = (imageUri: string) => {
    setSelectedImage(imageUri); // 선택한 이미지 URI 저장
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() || selectedImage) {
      onSend(inputMessage.trim(), selectedImage); // 트리밍된 메시지와 이미지 URI 전송
      setInputMessage(''); // 입력 필드 초기화
      setSelectedImage(null); // 선택한 이미지 초기화
    }
  };

  return (
    <View style={styles.inputContainer}>
      <ImageInput onChange={handleImageInput} />
      <TextInput
        style={styles.textInput}
        placeholder="Ask me anything"
        value={inputMessage}
        onChangeText={setInputMessage}
      />
      <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
        <MaterialIcons
          name="send"
          size={28}
          color={colors?.GRAY_500 || '#aaa'} // colors가 없을 경우 기본 색상 설정
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    //backgroundColor: '#f8f8f8',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default MessageInput;
