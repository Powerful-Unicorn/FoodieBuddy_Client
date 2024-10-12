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
    setSelectedImage(imageUri);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() || selectedImage) {
      onSend(inputMessage, selectedImage);
      setInputMessage('');
      setSelectedImage(null);
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
      <TouchableOpacity onPress={handleSendMessage} style={{marginLeft: 10}}>
        <MaterialIcons name="send" size={28} color={colors.GRAY_500} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 20,
  },
});

export default MessageInput;
