import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../constants';

interface AddInstructionBtnProps {
  onPress: () => void;
}

function AddInstructionBtn({onPress}: AddInstructionBtnProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <MaterialIcons name="add" size={28} color={colors.ORANGE_800} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    marginLeft: 10,
  },
});

export default AddInstructionBtn;
