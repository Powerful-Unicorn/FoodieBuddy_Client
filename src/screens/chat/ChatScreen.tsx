import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '../../navigations/drawer/MainDrawerNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

function ChatScreen() {
  const navigation = useNavigation<Navigation>();
  return (
    <View>
      <Text>채팅화면</Text>
      <Ionicons name="albums" color={colors.ORANGE_500} size={100} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default ChatScreen;
