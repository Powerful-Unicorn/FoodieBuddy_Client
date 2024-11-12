import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImageInput from './ImageInput';

interface MessageInputProps {
  onSend: (message: string, imageUri: string | null) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({onSend}) => {
  const [message, setMessage] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSend = () => {
    if (message.trim() || imageUri) {
      onSend(message, imageUri);
      setMessage('');
      setImageUri(null);
    }
  };

  const handleRemoveImage = () => {
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      {/* 이미지 선택 버튼 */}
      <ImageInput onChange={uri => setImageUri(uri)} />

      {/* 이미지 선택 시 미리보기와 삭제 버튼 */}
      {imageUri && (
        <View style={styles.previewContainer}>
          <Image source={{uri: imageUri}} style={styles.imagePreview} />
          <TouchableOpacity
            onPress={handleRemoveImage}
            style={styles.removeButton}>
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 메시지 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="Ask me anything"
        value={message}
        onChangeText={setMessage}
      />

      {/* 전송 버튼 */}
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  previewContainer: {
    position: 'relative',
    marginRight: 10,
  },
  imagePreview: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 20,
  },
});

export default MessageInput;
