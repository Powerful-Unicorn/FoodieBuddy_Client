import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {RouteProp} from '@react-navigation/native'; // RouteProp 사용
import {colors} from '../../constants/colors';
import ImageInput from '../../components/ImageInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MainDrawerParamList} from '../../navigations/drawer/MainDrawerNavigator';
import {mainNavigations} from '../../constants';
import ChatbotInstruction from '../../components/ChatbotInstruction';

interface Message {
  id: string;
  text?: string;
  imageUri?: string;
  sentByUser?: boolean;
  buttons?: string[];
}

// ChatScreen의 route 타입을 명시
type ChatScreenRouteProp = RouteProp<
  MainDrawerParamList,
  typeof mainNavigations.CHAT
>;

interface ChatScreenProps {
  route: ChatScreenRouteProp;
}

function ChatScreen({route}: ChatScreenProps) {
  const {showInstruction = false} = route.params || {};
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // "+" 버튼 클릭 시 챗봇 instruction 메시지 추가
  const addInstructionMessage = () => {
    const instructionMessage: Message = {
      id: Date.now().toString(),
      buttons: [
        'Food Recommendation',
        'Upload Menu Photo',
        'Upload Dish Photo',
      ],
      sentByUser: false,
    };
    setMessages(prevMessages => [...prevMessages, instructionMessage]);
  };

  useEffect(() => {
    if (showInstruction) {
      addInstructionMessage(); // "+" 버튼 클릭 시 메시지 추가
    }
  }, [showInstruction]);

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
      {item.buttons ? <ChatbotInstruction buttons={item.buttons} /> : null}
      {/* 버튼 메시지 컴포넌트 사용 */}
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
        <ImageInput onChange={handleImageInput} />

        <TextInput
          style={styles.textInput}
          placeholder="Ask me anything"
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
    justifyContent: 'flex-start', // 메시지가 위에서부터 쌓임
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
