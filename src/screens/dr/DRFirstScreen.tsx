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
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import api from '../../apis/api';
import axios from 'axios';
import {useSelector} from 'react-redux';

type DRFirstScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.DRFIRST
>;

const dietaryOptions = [
  {
    label: 'Halal',
    icon: <MaterialCommunityIcons name="food-halal" size={20} />,
  },
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

      navigation.navigate(authNavigations.DRSECOND, {
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
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color={colors.GRAY_700} />
            </TouchableOpacity>
            <Text style={styles.pageNumber}>1</Text>
            <TouchableOpacity style={styles.navBtn} onPress={handleNextButton}>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.GRAY_700}
              />
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
  pageNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DRFirstScreen;
