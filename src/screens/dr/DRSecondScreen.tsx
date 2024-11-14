import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {authNavigations, colors} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {login} from '../../states/authSlice';
import {useDispatch} from 'react-redux';
import api from '../../apis/api';

type DRSecondScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.DRSECOND
>;

const ingredientOptions = [
  {
    label: 'Meat',
    icon: <MaterialCommunityIcons name="food-drumstick" size={40} />,
  },
  {label: 'Egg', icon: <Ionicons name="egg" size={40} />},
  {
    label: 'Dairy',
    icon: <MaterialCommunityIcons name="cow" size={40} />,
  },
  {label: 'Seafood', icon: <Ionicons name="fish" size={40} />},
  {label: 'Nuts', icon: <MaterialCommunityIcons name="peanut" size={40} />},
  {
    label: 'Gluten',
    icon: <FontAwesome6 name="wheat-awn" size={40} />,
  },
  {
    label: 'Fruits',
    icon: <FontAwesome name="apple" size={40} />,
  },
  {
    label: 'Vegetables',
    icon: <FontAwesome name="leaf" size={40} />,
  },
  {
    label: 'Other',
    icon: <MaterialCommunityIcons name="pencil-plus" size={40} />,
  },
];

const subOptionsMap: {[key: string]: string[]} = {
  Dairy: ['Milk', 'Cheese'],
  Meat: ['Red Meat', 'Other Meat'],
  Seafood: ['Fish', 'Shellfish'],
  Nuts: ['Tree Nuts', 'Peanuts'],
  Fruits: ['Apple', 'Peach', 'Pear'],
  Vegetables: ['Mushroom', 'Carrot', 'Potato', 'Cucumber', 'Green onion'],
};

function DRSecondScreen({navigation, route}: DRSecondScreenProps) {
  const {dietRestrictions} = route.params;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [isEditingOther, setIsEditingOther] = useState(true);
  const userId = useSelector((state: any) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialSelectedOptions: string[] = [];
    if (dietRestrictions.other) setShowOtherInput(true);
    setSelectedOptions(initialSelectedOptions);
  }, [dietRestrictions]);

  const handleSelection = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleNextButton = async () => {
    const requestBody = {userId, other: otherText};
    try {
      await api.put('/user/dr2', requestBody, {
        headers: {'Content-Type': 'application/json'},
      });
      Alert.alert('Success', 'Restrictions saved successfully.', [
        {
          text: 'Start',
          onPress: () => {
            dispatch(login());
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'MainDrawer'}],
              }),
            );
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Step 2</Text>
          <Text style={styles.infoText}>
            Select ingredients you should avoid
          </Text>
          <View style={styles.optionsGrid}>
            {ingredientOptions.map(option => (
              <TouchableOpacity
                key={option.label}
                style={[
                  styles.optionCard,
                  selectedOptions.includes(option.label)
                    ? styles.optionCardSelected
                    : null,
                ]}
                onPress={() => handleSelection(option.label)}>
                {option.icon}
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {showOtherInput && (
            <View style={styles.otherInputContainer}>
              {isEditingOther ? (
                <TextInput
                  style={styles.input}
                  placeholder="Specify ingredients"
                  value={otherText}
                  onChangeText={setOtherText}
                />
              ) : (
                <Text style={styles.otherText}>{otherText}</Text>
              )}
              <Button
                title={isEditingOther ? 'Submit' : 'Edit'}
                onPress={() => setIsEditingOther(!isEditingOther)}
              />
            </View>
          )}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color={colors.GRAY_700} />
            </TouchableOpacity>
            <Text style={styles.pageNumber}>2</Text>
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
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  titleText: {
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 20,
    marginBottom: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  optionCardSelected: {
    backgroundColor: colors.ORANGE_200,
  },
  optionText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  otherInputContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  otherText: {
    fontSize: 16,
    marginBottom: 10,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  navBtn: {
    padding: 10,
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DRSecondScreen;
