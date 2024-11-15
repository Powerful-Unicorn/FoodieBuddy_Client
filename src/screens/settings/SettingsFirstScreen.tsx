import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {colors} from '../../constants';
import api from '../../apis/api';

const dietaryOptions = [
  {
    label: 'Hindu',
    icon: <MaterialIcons name="temple-hindu" size={24} />,
  },
  {
    label: 'Buddist',
    icon: <MaterialIcons name="temple-buddhist" size={24} />,
  },
  {
    label: 'Vegan',
    icon: <MaterialCommunityIcons name="sprout" size={24} />,
  },
  {
    label: 'Lacto',
    icon: <MaterialCommunityIcons name="sprout" size={24} />,
  },
  {
    label: 'Ovo',
    icon: <MaterialCommunityIcons name="sprout" size={24} />,
  },
  {
    label: 'Lacto-ovo',
    icon: <MaterialCommunityIcons name="sprout" size={24} />,
  },
  {
    label: 'Pescatarian',
    icon: <MaterialCommunityIcons name="sprout" size={24} />,
  },
  {
    label: 'Pollotarian',
    icon: <MaterialCommunityIcons name="sprout" size={24} />,
  },
];

function SettingsFirstScreen({navigation}: any) {
  const userId = useSelector((state: any) => state.user.userId);
  const [selectedDR, setSelectedDR] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDietaryData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/user/dr/${userId}`);
        setSelectedDR(
          response.data.vegetarian.split(', ').filter((item: string) => item),
        );
      } catch (error) {
        console.error('Failed to fetch dietary data:', error);
        Alert.alert('Error', 'Failed to load dietary information.');
      } finally {
        setLoading(false);
      }
    };

    fetchDietaryData();
  }, [userId]);

  const handleSelection = (option: string) => {
    if (selectedDR.includes(option)) {
      setSelectedDR(selectedDR.filter(item => item !== option));
    } else {
      setSelectedDR([...selectedDR, option]);
    }
  };

  const handleSave = async () => {
    const requestBody = {
      userId,
      vegetarian: selectedDR.join(', '),
    };

    try {
      await api.put('/user/dr', requestBody, {
        headers: {'Content-Type': 'application/json'},
      });
      Alert.alert('Success', 'Dietary preferences updated successfully!');
    } catch (error) {
      console.error('Failed to update dietary preferences:', error);
      Alert.alert('Error', 'Failed to update dietary preferences.');
    }
  };

  const handleNext = () => {
    navigation.navigate('SettingsSecondScreen', {selectedDR});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titleText}>Step 1</Text>
        <Text style={styles.infoText}>Select your dietary restrictions</Text>
        {loading ? (
          <ActivityIndicator size="large" color={colors.ORANGE_800} />
        ) : (
          dietaryOptions.map(option => (
            <View key={option.label} style={styles.optionWrapper}>
              <TouchableOpacity
                style={styles.optionContainer}
                onPress={() => handleSelection(option.label)}>
                {option.icon}
                <Text style={styles.optionText}>{option.label}</Text>
                <Ionicons
                  name={
                    selectedDR.includes(option.label)
                      ? 'checkbox'
                      : 'checkbox-outline'
                  }
                  size={24}
                  color={colors.ORANGE_800}
                />
              </TouchableOpacity>
            </View>
          ))
        )}

        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={colors.GRAY_700} />
          </TouchableOpacity>
          <Text style={styles.pageNumber}>1</Text>
          <TouchableOpacity style={styles.navBtn} onPress={handleNext}>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={colors.GRAY_700}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  titleText: {
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 20,
    marginBottom: 5,
  },
  optionWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: colors.ORANGE_800,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  navBtn: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsFirstScreen;
