import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  PressableProps,
  Dimensions,
  View,
} from 'react-native';
import {colors} from '../constants';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'medium';
  inValid?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;
function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      disabled={inValid}
      style={({pressed}) => [
        styles.container,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
      ]}
      {...props}>
      <View style={styles[size]}>
        <Text style={styles[`${variant}Text`]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inValid: {
    opacity: 0.5,
  },
  filled: {
    backgroundColor: colors.ORANGE_800,
  },
  outlined: {
    borderColor: colors.ORANGE_800,
    borderWidth: 1,
  },
  large: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    //flexDirection: 'row',
  },
  medium: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },

  filledPressed: {
    backgroundColor: colors.ORANGE_800,
    opacity: 0.5,
    //backgroundColor: colors.ORANGE_200,
  },
  outlinedPressed: {
    borderColor: colors.ORANGE_800,
    borderWidth: 1,
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  filledText: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  outlinedText: {
    color: colors.ORANGE_800,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomButton;
