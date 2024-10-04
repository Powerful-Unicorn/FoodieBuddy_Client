import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
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
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '../../navigations/drawer/MainDrawerNavigator';
import {colors} from '../../constants';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

interface Message {
  id: string;
  text?: string;
  imageUri?: string;
}

function ChatScreen() {
  const navigation = useNavigation<Navigation>();
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
      };
      setMessages(prevMessages => [newMessage, ...prevMessages]);
      setInputMessage('');
      setSelectedImage(null);
    }
  };

  // 이미지 선택
  const pickImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    const result = await launchImageLibrary(options);
    if (result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri || null);
    }
  };

  // 메시지 렌더링
  const renderItem = ({item}: {item: Message}) => (
    <View style={{marginVertical: 10}}>
      {item.imageUri ? (
        <Image
          source={{uri: item.imageUri}}
          style={{width: 200, height: 200}}
        />
      ) : null}
      {item.text ? <Text>{item.text}</Text> : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        inverted // 최신 메시지를 아래로
      />

      {selectedImage ? (
        <Image
          source={{uri: selectedImage}}
          style={{width: 100, height: 100, marginBottom: 10}}
        />
      ) : null}

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage} style={{marginRight: 10}}>
          <Text style={styles.icon}>📷</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Ask me anything.."
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={{marginLeft: 10}}>
          <Text style={styles.icon}>Send</Text>
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
  icon: {
    fontSize: 24,
  },
});

export default ChatScreen;
