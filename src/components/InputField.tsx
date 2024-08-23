import React, {useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TextInputProps,
  Text,
  Pressable,
} from 'react-native';
import {colors} from '../constants';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}
const deviceHeight = Dimensions.get('screen').height;

function InputField({
  disabled = false,
  touched,
  error,
  ...props
}: InputFieldProps) {
  const innerRef = useRef<TextInput | null>(null);

  {
    /* input 주변 눌렀을 때도 잘 포커스되도록 */
  }
  const handlePressInput = () => {
    innerRef.current?.focus();
  };

  return (
    <Pressable onPress={handlePressInput}>
      <View
        style={[
          styles.container,
          disabled && styles.disabled,
          touched && Boolean(error) && styles.inputError,
        ]}>
        <TextInput
          editable={!disabled}
          placeholderTextColor={colors.GRAY_500}
          style={[styles.input, disabled && styles.disabled]}
          //키보드 기능
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          {...props}
        />
        {/* 터치된 적이 있으면서, 에러일 때  */}
        {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: 15,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_500,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default InputField;
