import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

interface ChatbotInstructionProps {
  buttons?: string[]; // 버튼 목록
  onButtonPress?: (url: string) => void; // 버튼 클릭 핸들러
}

const ChatbotInstruction: React.FC<ChatbotInstructionProps> = ({
  buttons = [],
  onButtonPress,
}) => {
  if (!buttons || buttons.length === 0) {
    return null; // 버튼이 없으면 아무것도 렌더링하지 않음
  }

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          title={button}
          onPress={() => onButtonPress?.(button)} // 클릭 시 부모로 이벤트 전달
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, // 버튼 간의 간격 추가
    marginTop: 10,
  },
});

export default ChatbotInstruction;
