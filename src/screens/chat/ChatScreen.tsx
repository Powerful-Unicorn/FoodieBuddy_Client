import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {MainDrawerParamList} from '../../navigations/drawer/MainDrawerNavigator';
import {mainNavigations} from '../../constants';
import MessageItem from '../../components/chat/MessageItem';
import MessageInput from '../../components/chat/MessageInput';
import AddInstructionBtn from '../../components/chat/AddInstructionBtn';

interface Message {
  id: string;
  text?: string;
  imageUri?: string;
  sentByUser?: boolean;
  buttons?: string[];
}

type ChatScreenRouteProp = RouteProp<
  MainDrawerParamList,
  typeof mainNavigations.CHAT
>;

interface ChatScreenProps {
  route: ChatScreenRouteProp;
  navigation: any;
}

function ChatScreen({route, navigation}: ChatScreenProps) {
  const {showInstruction = false} = route.params || {};
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (showInstruction) {
      addInstructionMessage();
    }
  }, [showInstruction]);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddInstructionBtn onPress={addInstructionMessage} />,
    });
  }, [navigation]);

  const handleSendMessage = (message: string, imageUri: string | null) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      imageUri: imageUri || undefined,
      sentByUser: true,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({item}) => <MessageItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
      <MessageInput onSend={handleSendMessage} />
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
    justifyContent: 'flex-start',
  },
});

export default ChatScreen;
