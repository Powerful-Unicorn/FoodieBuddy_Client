import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import {colors} from '../../constants/colors';
import ImageInput from '../../components/ImageInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Message {
  id: string;
  text?: string;
  imageUri?: string;
  sentByUser?: boolean;
}

function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 메시지 전송
  const sendMessage = () => {
    if (inputMessage.trim() || selectedImage) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        imageUri: selectedImage || undefined,
        sentByUser: true,
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputMessage('');
      setSelectedImage(null);
    }
  };

  // 이미지 선택 콜백 함수
  const handleImageInput = () => {
    console.log('ImageInput 클릭됨');
    // ImagePicker 호출 또는 이미지 선택 로직을 추가하세요
  };

  // 메시지 렌더링
  const renderItem = ({item}: {item: Message}) => (
    <View
      style={[
        styles.messageContainer,
        item.sentByUser ? styles.sentMessage : styles.receivedMessage,
      ]}>
      {item.imageUri ? (
        <Image source={{uri: item.imageUri}} style={styles.image} />
      ) : null}
      {item.text ? <Text style={styles.messageText}>{item.text}</Text> : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />

      {selectedImage ? (
        <Image
          source={{uri: selectedImage}}
          style={{width: 100, height: 100, marginBottom: 10}}
        />
      ) : null}

      <View style={styles.inputContainer}>
        {/* ImageInput 컴포넌트 삽입 */}
        <ImageInput onChange={handleImageInput} />

        <TextInput
          style={styles.textInput}
          placeholder="메시지를 입력하세요"
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={{marginLeft: 10}}>
          <MaterialIcons name="send" size={28} color={colors.GRAY_500} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
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
  messageContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  sentMessage: {
    backgroundColor: '#d1f7c4',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default ChatScreen;
