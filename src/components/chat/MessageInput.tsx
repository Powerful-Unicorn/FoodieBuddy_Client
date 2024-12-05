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
import Icon from 'react-native-vector-icons/MaterialIcons'; // 아이콘 추가
import ImageInput from './ImageInput';
import {colors} from '../../constants';

interface MessageInputProps {
  onSend: (
    message: string,
    imageUri: string | null,
    binaryData: ArrayBuffer | null,
  ) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({onSend}) => {
  const [message, setMessage] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [binaryData, setBinaryData] = useState<ArrayBuffer | null>(null);

  const handleSend = () => {
    if (message.trim() || imageUri) {
      onSend(message, imageUri, binaryData);
      setMessage('');
      setImageUri(null);
      setBinaryData(null);
    }
  };

  const handleRemoveImage = () => {
    setImageUri(null);
    setBinaryData(null);
  };

  const handleCameraPress = () => {
    console.log('Camera icon pressed');
    // 카메라 실행 로직 추가 가능
  };

  return (
    <View style={styles.container}>
      {/* 카메라 아이콘과 이미지 입력 버튼은 미리보기가 없을 때만 표시 */}
      {!imageUri && (
        <>
          {/* 카메라 아이콘 */}
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={handleCameraPress}>
            <Icon name="camera-alt" size={30} color={colors.ORANGE_800} />
          </TouchableOpacity>

          {/* 이미지 입력 버튼 */}
          <ImageInput
            onChange={(uri, data) => {
              setImageUri(uri);
              setBinaryData(data);
            }}
          />
        </>
      )}

      {/* 이미지 미리보기 */}
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

      {/* 메시지 입력창 */}
      <TextInput
        style={styles.input}
        placeholder="Ask me anything"
        value={message}
        onChangeText={setMessage}
      />
      {/* 전송 버튼 */}
      <Button title="Send" onPress={handleSend} color="#F27059" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  cameraIcon: {
    marginLeft: 10,
    marginRight: 10,
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
    borderColor: colors.ORANGE_800,
    borderWidth: 2,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 20,
  },
});

export default MessageInput;
