import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../constants';
interface ChatbotInstructionProps {
  buttons: string[];
}

const ChatbotInstruction = ({buttons}: ChatbotInstructionProps) => {
  const handleButtonPress = (buttonText: string) => {
    console.log(`${buttonText} 버튼이 클릭됨`);
    // 버튼 클릭 시 실행할 로직 추가
  };

  return (
    <View style={styles.buttonsContainer}>
      {buttons.map(button => (
        <TouchableOpacity
          key={button}
          style={styles.button}
          onPress={() => handleButtonPress(button)}>
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    //backgroundColor: colors.GRAY_200,
  },
  button: {
    backgroundColor: colors.ORANGE_800,
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    alignItems: 'center',
    width: 180,
  },
  buttonText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
});

export default ChatbotInstruction;
