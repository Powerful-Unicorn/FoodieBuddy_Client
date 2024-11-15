import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Button,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import api from '../../apis/api';
import {colors} from '../../constants';

const ingredientOptions = [
  'Meat',
  'Egg',
  'Dairy',
  'Seafood',
  'Nuts',
  'Gluten',
  'Fruits',
  'Vegetables',
  'Other',
];

const subOptionsMap: {[key: string]: string[]} = {
  Dairy: ['Milk', 'Cheese'],
  Meat: ['Red Meat', 'Other Meat'],
  Seafood: ['Fish', 'Shellfish'],
  Nuts: ['Tree Nuts', 'Peanuts'],
  Fruits: ['Apple', 'Peach', 'Pear'],
  Vegetables: ['Mushroom', 'Carrot', 'Potato', 'Cucumber', 'Green onion'],
};

function SettingsSecondScreen({route, navigation}: any) {
  const userId = useSelector((state: any) => state.user.userId);
  const {selectedDR} = route.params;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [showSubOptions, setShowSubOptions] = useState<{
    [key: string]: boolean;
  }>({
    Dairy: false,
    Meat: false,
    Seafood: false,
    Nuts: false,
  });

  useEffect(() => {
    const fetchDietaryData = async () => {
      try {
        const response = await api.get(`/user/dr/${userId}`);
        const data = response.data;

        const initialSelectedOptions: string[] = [];
        if (data.meat === 'all kinds') {
          initialSelectedOptions.push('Meat', ...subOptionsMap['Meat']);
          setShowSubOptions(prev => ({...prev, Meat: true}));
        }
        if (data.egg === true) initialSelectedOptions.push('Egg');
        if (data.dairy) initialSelectedOptions.push('Dairy');
        if (data.seafood) initialSelectedOptions.push('Seafood');
        if (data.nut) initialSelectedOptions.push('Nuts');
        if (data.gluten === true) initialSelectedOptions.push('Gluten');
        if (data.fruit) initialSelectedOptions.push('Fruits');
        if (data.vegetable) initialSelectedOptions.push('Vegetables');
        if (data.other) {
          initialSelectedOptions.push('Other');
          setShowOtherInput(true);
          setOtherText(data.other);
        }
        setSelectedOptions(initialSelectedOptions);
      } catch (error) {
        console.error('Failed to fetch dietary data:', error);
        Alert.alert('Error', 'Failed to load dietary information.');
      }
    };

    fetchDietaryData();
  }, [userId]);

  // 항목 선택 핸들러
  const handleOptionSelection = (option: string) => {
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
      }
    } else {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(item => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  // 저장 버튼 핸들러
  const handleSave = async () => {
    const requestBody = {
      userId,
      vegetarian: selectedDR.join(', '),
      meat: selectedOptions.includes('Meat')
        ? selectedOptions
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
    };

    try {
      const response = await api.put('/user/dr', requestBody, {
        headers: {'Content-Type': 'application/json'},
      });
      Alert.alert('Success', 'Dietary information updated successfully!');
    } catch (error) {
      console.error('Failed to update dietary data:', error);
      Alert.alert('Error', 'Failed to update dietary information.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Step 2: Ingredients</Text>
      {ingredientOptions.map(option => (
        <View key={option} style={styles.optionWrapper}>
          <TouchableOpacity onPress={() => handleOptionSelection(option)}>
            <Ionicons
              name={
                selectedOptions.includes(option)
                  ? 'checkbox'
                  : 'checkbox-outline'
              }
              size={24}
              color={colors.ORANGE_800}
            />
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Button title="Save Changes" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SettingsSecondScreen;
