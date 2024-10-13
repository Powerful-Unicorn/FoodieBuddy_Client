import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../constants';

interface ChatbotInstructionProps {
  buttons: string[];
  onButtonPress: (button: string) => void; // onButtonPress prop 추가
}

const ChatbotInstruction = ({
  buttons,
  onButtonPress,
}: ChatbotInstructionProps) => {
  return (
    <View style={styles.buttonsContainer}>
      {buttons.map(button => (
        <TouchableOpacity
          key={button}
          style={styles.button}
          onPress={() => onButtonPress(button)} // 버튼 클릭 시 onButtonPress 호출
        >
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
