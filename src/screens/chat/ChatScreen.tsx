import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '../../navigations/drawer/MainDrawerNavigator';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

function ChatScreen() {
  const navigation = useNavigation<Navigation>();
  return (
    <View>
      <Text>채팅화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ChatScreen;
