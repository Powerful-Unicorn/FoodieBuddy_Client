import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {authNavigations, colors} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../../apis/api';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {RootStackParamList} from '../../navigations/root/RootNavigator';

type DRFirstScreenProps = StackScreenProps<RootStackParamList, 'DRFirst'>;

const dietaryOptions = [
  {
    label: 'Hindu',
    icon: <MaterialIcons name="temple-hindu" size={20} />,
  },
  {
    label: 'Buddist',
    icon: <MaterialIcons name="temple-buddhist" size={20} />,
  },
  {
    label: 'Vegan',
    icon: <MaterialCommunityIcons name="sprout" size={20} />,
  },
  {
    label: 'Lacto',
    icon: <MaterialCommunityIcons name="sprout" size={20} />,
  },
  {
    label: 'Ovo',
    icon: <MaterialCommunityIcons name="sprout" size={20} />,
  },
  {
    label: 'Lacto-Ovo',
    icon: <MaterialCommunityIcons name="sprout" size={20} />,
  },
  {
    label: 'Pescatarian',
    icon: <MaterialCommunityIcons name="sprout" size={20} />,
  },
  {
    label: 'Pollotarian',
    icon: <MaterialCommunityIcons name="sprout" size={20} />,
  },
  {
    label: 'None above',
    icon: <MaterialCommunityIcons name="alpha-x-circle-outline" size={24} />,
  },
];

function DRFirstScreen({navigation}: DRFirstScreenProps) {
  const [selectedDR, setSelectedDR] = useState<string[]>([]);
  const userId = useSelector((state: any) => state.user.userId);

  const handleSelection = (option: string) => {
    if (selectedDR.includes(option)) {
      setSelectedDR(selectedDR.filter(item => item !== option));
    } else {
      setSelectedDR([...selectedDR, option]);
    }
  };

  const handleNextButton = async () => {
    const requestBody = {
      religion: '',
      vegetarian: selectedDR.join(', '),
      userId: userId,
    };

    try {
      const response = await api.post('/user/dr1', requestBody, {
        headers: {'Content-Type': 'application/json'},
      });

      navigation.navigate('DRSecond', {
        selectedDR: selectedDR.join(', '),
        dietRestrictions: response.data,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Alert.alert(
          'Error',
          error.response.data.message || 'Failed to fetch preferences',
        );
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleText}>Step 1</Text>
          <Text style={styles.infoText}>Select your dietary restrictions</Text>
          {dietaryOptions.map(option => (
            <View
              key={option.label} // key 수정
              style={[styles.optionWrapper, styles.shadowStyle]}>
              <TouchableOpacity
                style={styles.optionContainer}
                onPress={() => handleSelection(option.label)}>
                {/* label 사용 */}
                {option.icon}
                <Text style={styles.optionText}>{option.label}</Text>
                {/* label 표시 */}
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
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.backButton]}
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.nextButton]}
              onPress={handleNextButton}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
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
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  titleText: {
    backgroundColor: colors.ORANGE_800,
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginHorizontal: -20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  optionWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  shadowStyle: {
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: colors.GRAY_700,
  },
  nextButton: {
    backgroundColor: colors.ORANGE_800,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default DRFirstScreen;
