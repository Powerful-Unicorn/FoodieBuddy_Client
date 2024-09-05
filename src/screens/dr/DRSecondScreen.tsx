import React, {useState} from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, drNavigations} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import {DRStackParamList} from '../../navigations/stack/DRStackNavigatior';
import Ionicons from 'react-native-vector-icons/Ionicons';

type DRSecondScreenProps = StackScreenProps<
  DRStackParamList,
  typeof drNavigations.DRSECOND
>;

function DRSecondScreen({navigation}: DRSecondScreenProps) {
  const [dr, setDR] = useState<string | null>(null);
  const handleVeganSelection = () => {
    setDR('Vegan');
  };

  const handleNextButton = () => {
    navigation.navigate(drNavigations.DRSECOND, {selectedDR: dr});
  };

  return (
    <View style={styles.container}>
      <Button title="Meat" onPress={handleVeganSelection} />

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.GRAY_700} />
        </TouchableOpacity>
        <Text style={styles.pageNumber}>2</Text>
        <TouchableOpacity style={styles.navBtn} onPress={handleNextButton}>
          <Ionicons name="chevron-forward" size={24} color={colors.GRAY_700} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  navBtn: {
    padding: 10,
    backgroundColor: colors.GRAY_200,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  nextBtn: {
    backgroundColor: colors.ORANGE_500,
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DRSecondScreen;
