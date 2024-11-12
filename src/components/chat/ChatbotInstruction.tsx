// ChatbotInstruction.tsx
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ChatbotInstructionProps {
  onButtonPress: (url: string) => void;
}

const ChatbotInstruction: React.FC<ChatbotInstructionProps> = ({
  onButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          onButtonPress('ws://api.foodiebuddy.kro.kr:8000/recommendation')
        }>
        <Text style={styles.buttonText}>Food Recommendation</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          onButtonPress('ws://api.foodiebuddy.kro.kr:8000/askmenu')
        }>
        <Text style={styles.buttonText}>Upload Menu Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          onButtonPress('ws://api.foodiebuddy.kro.kr:8000/askdish')
        }>
        <Text style={styles.buttonText}>Upload Dish Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#f27a57',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatbotInstruction;
