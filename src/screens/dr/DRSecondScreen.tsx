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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {authNavigations, colors, mainNavigations} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import api from '../../apis/api';
import {useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {login} from '../../states/authSlice';
import {useDispatch} from 'react-redux';

type DRSecondScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.DRSECOND
>;

const ingredientOptions = [
  {
    label: 'Meat',
    icon: <MaterialCommunityIcons name="food-drumstick" size={24} />,
  },
  {
    label: 'Egg',
    icon: <Ionicons name="egg" size={24} />,
  },
  {
    label: 'Dairy',
    icon: <MaterialCommunityIcons name="cow" size={24} />,
  },
  {
    label: 'Seafood',
    icon: <Ionicons name="fish" size={24} />,
  },
  {
    label: 'Nuts',
    icon: <MaterialCommunityIcons name="peanut" size={24} />,
  },
  {
    label: 'Gluten',
    icon: <FontAwesome6 name="wheat-awn" size={24} />,
  },
  {
    label: 'Fruits',
    icon: <FontAwesome6 name="apple-whole" size={24} />,
  },
  {
    label: 'Vegetables',
    icon: <FontAwesome name="leaf" size={24} />,
  },
  {
    label: 'Other',
    icon: <MaterialCommunityIcons name="pencil-plus" size={24} />,
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
  const [showSubOptions, setShowSubOptions] = useState<{
    [key: string]: boolean;
  }>({
    Dairy: false,
    Meat: false,
    Seafood: false,
    Nuts: false,
  });
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState(dietRestrictions.other || '');
  const [isEditingOther, setIsEditingOther] = useState(true);
  const userId = useSelector((state: any) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialSelectedOptions: string[] = [];

    if (dietRestrictions.meat === 'all kinds') {
      initialSelectedOptions.push('Meat', ...subOptionsMap['Meat']);
      setShowSubOptions(prev => ({...prev, Meat: true}));
    }
    if (dietRestrictions.egg === true) initialSelectedOptions.push('Egg');
    if (dietRestrictions.dairy) initialSelectedOptions.push('Dairy');
    if (dietRestrictions.seafood) initialSelectedOptions.push('Seafood');
    if (dietRestrictions.nuts) initialSelectedOptions.push('Nuts');
    if (dietRestrictions.gluten === true) initialSelectedOptions.push('Gluten');
    if (dietRestrictions.fruit) initialSelectedOptions.push('Fruits');
    if (dietRestrictions.vegetable) initialSelectedOptions.push('Vegetables');
    if (dietRestrictions.other) {
      initialSelectedOptions.push('Other');
      setShowOtherInput(true);
      setIsEditingOther(false);
    }

    setSelectedOptions(initialSelectedOptions);
  }, [dietRestrictions]);

  const handleSelection = (option: string) => {
    const subOptions = subOptionsMap[option] || [];

    if (subOptions.length > 0) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(
          selectedOptions.filter(
            item => ![option, ...subOptions].includes(item),
          ),
        );
        setShowSubOptions({...showSubOptions, [option]: false});
      } else {
        setSelectedOptions([...selectedOptions, option, ...subOptions]);
        setShowSubOptions({...showSubOptions, [option]: true});
      }
    } else if (option === 'Other') {
      if (selectedOptions.includes('Other')) {
        setSelectedOptions(selectedOptions.filter(item => item !== 'Other'));
        setShowOtherInput(false);
        setOtherText('');
      } else {
        setSelectedOptions([...selectedOptions, option]);
        setShowOtherInput(true);
        setIsEditingOther(true);
      }
    } else {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(item => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const handleSubSelection = (option: string, subOption: string) => {
    if (selectedOptions.includes(subOption)) {
      setSelectedOptions(selectedOptions.filter(item => item !== subOption));
    } else {
      setSelectedOptions([...selectedOptions, subOption]);
    }
  };

  const handleOtherSubmit = () => {
    setIsEditingOther(false);
  };
  const createRequestBody = () => {
    const body: any = {
      meat: selectedOptions.includes('Meat')
        ? dietRestrictions.meat === 'all kinds'
          ? 'all kinds'
          : selectedOptions
              .filter(item => subOptionsMap['Meat'].includes(item))
              .join(', ')
        : '',
      egg: selectedOptions.includes('Egg'),
      dairy: selectedOptions.includes('Dairy')
        ? selectedOptions
            .filter(item => subOptionsMap['Dairy'].includes(item))
            .join(', ')
        : '',
      seafood: selectedOptions.includes('Seafood')
        ? selectedOptions
            .filter(item => subOptionsMap['Seafood'].includes(item))
            .join(', ')
        : '',
      nut: selectedOptions.includes('Nuts')
        ? selectedOptions
            .filter(item => subOptionsMap['Nuts'].includes(item))
            .join(', ')
        : '',
      gluten: selectedOptions.includes('Gluten'),
      fruit: selectedOptions.includes('Fruits')
        ? selectedOptions
            .filter(item => subOptionsMap['Fruits'].includes(item))
            .join(', ')
        : '',
      vegetable: selectedOptions.includes('Vegetables')
        ? selectedOptions
            .filter(item => subOptionsMap['Vegetables'].includes(item))
            .join(', ')
        : '',
      other: otherText,
      userId: userId,
    };

    return body;
  };

  const handleNextButton = async () => {
    const requestBody = createRequestBody();
    console.log('Request Body: ', requestBody);

    try {
      const response = await api.put('/user/dr2', requestBody, {
        headers: {'Content-Type': 'application/json'},
      });
      console.log('Response Data:', response.data);

      Alert.alert(
        'Ingredients you cannot eat',
        JSON.stringify(response.data, null, 2),
        [
          {
            text: 'Start Foodie Buddy',
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
        ],
      );
    } catch (error) {
      console.error('Error occurred:', error);
      Alert.alert('Error', 'Failed to send data');
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
          {ingredientOptions.map(option => (
            <View key={option.label} style={styles.optionWrapper}>
              <TouchableOpacity
                style={styles.optionContainer}
                onPress={() => handleSelection(option.label)}>
                {option.icon}

                <Text style={styles.optionText}>{option.label}</Text>
                <Ionicons
                  name={
                    selectedOptions.includes(option.label)
                      ? 'checkbox'
                      : 'checkbox-outline'
                  }
                  size={24}
                  color={colors.ORANGE_800}
                  style={{marginLeft: 10}}
                />
              </TouchableOpacity>

              {subOptionsMap[option.label] && showSubOptions[option.label] && (
                <View style={styles.subOptionsRow}>
                  {subOptionsMap[option.label].map(subOption => (
                    <TouchableOpacity
                      key={subOption}
                      style={styles.subOptionContainer}
                      onPress={() =>
                        handleSubSelection(option.label, subOption)
                      }>
                      <Ionicons
                        name={
                          selectedOptions.includes(subOption)
                            ? 'checkbox'
                            : 'checkbox-outline'
                        }
                        size={24}
                        color={colors.ORANGE_200}
                      />
                      <Text style={styles.subOptionText}>{subOption}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {option.label === 'Other' && showOtherInput && (
                <View style={styles.otherInputContainer}>
                  {isEditingOther ? (
                    <View style={styles.centerContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Distinguish ingredients using comma"
                        value={otherText}
                        onChangeText={setOtherText}
                      />
                      <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleOtherSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.centerContainer}>
                      <Text style={styles.otherText}>{otherText}</Text>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => setIsEditingOther(true)}>
                        <Text style={styles.buttonText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
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
    marginBottom: 5,
  },
  optionWrapper: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
  subOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 40,
  },
  subOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginRight: 15,
  },
  subOptionText: {
    marginLeft: 5,
    fontSize: 14,
  },
  otherInputContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  centerContainer: {
    alignItems: 'center', // 수평 중앙 정렬
    justifyContent: 'center', // 수직 중앙 정렬
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '100%',
  },
  otherText: {
    flex: 1,
    fontSize: 16,
    marginBottom: 20,
  },

  submitButton: {
    backgroundColor: colors.ORANGE_800,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 80,
  },
  editButton: {
    backgroundColor: colors.GRAY_700,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 80,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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

export default DRSecondScreen;
