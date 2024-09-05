import React, {useState} from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, drNavigations} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import {DRStackParamList} from '../../navigations/stack/DRStackNavigatior';

type DRFirstScreenProps = StackScreenProps<
  DRStackParamList,
  typeof drNavigations.DRFIRST
>;

function DRFirstScreen({navigation}: DRFirstScreenProps) {
  const [dr, setDR] = useState<string | null>(null);

  const handleVeganSelection = () => {
    setDR('Vegan');
  };

  const handleNextButton = () => {
    navigation.navigate(drNavigations.DRSECOND);
  };

  return (
    <View style={styles.container}>
      <Text>Dietary Restriction:</Text>
      <Button title="Vegan" onPress={handleVeganSelection} />
      {/* Other dietary options */}
      <TouchableOpacity style={styles.nextBtn} onPress={handleNextButton}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtn: {
    backgroundColor: colors.ORANGE_500,
  },
});

export default DRFirstScreen;
