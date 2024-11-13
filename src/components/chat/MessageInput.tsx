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

  return (
    <View style={styles.container}>
      <ImageInput
        onChange={(uri, data) => {
          setImageUri(uri);
          setBinaryData(data);
        }}
      />

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

      <TextInput
        style={styles.input}
        placeholder="Ask me anything"
        value={message}
        onChangeText={setMessage}
      />
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
