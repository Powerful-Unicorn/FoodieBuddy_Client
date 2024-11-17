import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useSelector} from 'react-redux';
import api from '../../apis/api';
import {colors} from '../../constants';

// 인터페이스 정의
interface DietRestrictions {
  meat?: string;
  egg?: boolean;
  dairy?: string;
  seafood?: string;
  nut?: string;
  gluten?: boolean;
  fruit?: string;
  vegetable?: string;
  other?: string;
}

// 옵션 및 서브 옵션 정의
const ingredientOptions = [
  {
    label: 'Meat',
    icon: <MaterialCommunityIcons name="food-drumstick" size={24} />,
  },
  {label: 'Egg', icon: <Ionicons name="egg" size={24} />},
  {label: 'Dairy', icon: <MaterialCommunityIcons name="cow" size={24} />},
  {label: 'Seafood', icon: <Ionicons name="fish" size={24} />},
  {label: 'Nuts', icon: <MaterialCommunityIcons name="peanut" size={24} />},
  {label: 'Gluten', icon: <FontAwesome6 name="wheat-awn" size={24} />},
  {label: 'Fruits', icon: <FontAwesome6 name="apple-whole" size={24} />},
  {label: 'Vegetables', icon: <FontAwesome name="leaf" size={24} />},
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

function SettingsSecondScreen({navigation}: any) {
  const userId = useSelector((state: any) => state.user.userId);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showSubOptions, setShowSubOptions] = useState<{
    [key: string]: boolean;
  }>({});
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [isEditingOther, setIsEditingOther] = useState(false);

  // 데이터 Fetch
  useEffect(() => {
    const fetchDietaryData = async () => {
      try {
        const response = await api.get(`/user/dr/${userId}`);
        const dietRestrictions: DietRestrictions = response.data;

        const initialSelectedOptions: string[] = [];
        const initialSubOptionsState: {[key: string]: boolean} = {};

        // 부모 옵션과 하위 옵션 설정
        const setParentAndSubOptions = (
          parent: string,
          data: string | undefined,
        ) => {
          if (!data) return;

          // 응답 데이터에서 해당 부모 항목의 하위 항목 추출
          const selectedSubOptions = data
            .split(', ')
            .filter(subOption => subOptionsMap[parent]?.includes(subOption));

          // 부모 항목과 하위 항목 모두 선택
          if (selectedSubOptions.length > 0) {
            initialSelectedOptions.push(parent); // 부모 항목 추가
            initialSelectedOptions.push(...selectedSubOptions); // 하위 항목 추가
            initialSubOptionsState[parent] = true; // 하위 항목 토글 열기
          } else {
            initialSelectedOptions.push(parent); // 부모 항목만 추가
          }
        };

        // Meat, Dairy, Seafood 등 처리
        setParentAndSubOptions('Meat', dietRestrictions.meat);
        setParentAndSubOptions('Dairy', dietRestrictions.dairy);
        setParentAndSubOptions('Seafood', dietRestrictions.seafood);
        setParentAndSubOptions('Nuts', dietRestrictions.nut);
        setParentAndSubOptions('Fruits', dietRestrictions.fruit);
        setParentAndSubOptions('Vegetables', dietRestrictions.vegetable);

        // Boolean 값 처리
        if (dietRestrictions.egg) initialSelectedOptions.push('Egg');
        if (dietRestrictions.gluten) initialSelectedOptions.push('Gluten');

        // Other 처리
        if (dietRestrictions.other) {
          initialSelectedOptions.push('Other');
          setShowOtherInput(true);
          setOtherText(dietRestrictions.other);
          setIsEditingOther(false);
        }

        // 기본적으로 모든 상위 항목의 토글 열기
        Object.keys(subOptionsMap).forEach(parent => {
          if (!(parent in initialSubOptionsState)) {
            initialSubOptionsState[parent] = true; // 기본적으로 열기
          }
        });

        // 상태 업데이트
        setSelectedOptions(initialSelectedOptions);
        setShowSubOptions(initialSubOptionsState);
      } catch (error) {
        console.error('Failed to fetch dietary data:', error);
        Alert.alert('Error', 'Failed to load dietary information.');
      }
    };

    fetchDietaryData();
  }, [userId]);

  const handleSelection = (option: string) => {
    const subOptions = subOptionsMap[option] || [];

    // 부모 옵션 (SubOptions 존재)
    if (subOptions.length > 0) {
      if (selectedOptions.includes(option)) {
        // 부모 옵션 비활성화: 부모 옵션과 모든 하위 항목 제거
        setSelectedOptions(
          selectedOptions.filter(
            item => item !== option && !subOptions.includes(item),
          ),
        );
        setShowSubOptions({...showSubOptions, [option]: false});
      } else {
        // 부모 옵션 활성화: 부모 옵션과 모든 하위 항목 추가
        setSelectedOptions([...selectedOptions, option, ...subOptions]);
        setShowSubOptions({...showSubOptions, [option]: true});
      }
    }

    // 하위 항목 (SubOptions 중 하나)
    else {
      const parentOption = Object.keys(subOptionsMap).find(parent =>
        subOptionsMap[parent].includes(option),
      );

      if (selectedOptions.includes(option)) {
        // 하위 항목 비활성화
        setSelectedOptions(selectedOptions.filter(item => item !== option));

        // 모든 하위 항목이 비활성화되면 부모 옵션 토글 닫기
        if (
          parentOption &&
          subOptionsMap[parentOption].every(
            subOption =>
              !selectedOptions.includes(subOption) || subOption === option,
          )
        ) {
          setShowSubOptions({...showSubOptions, [parentOption]: false});
        }
      } else {
        // 하위 항목 활성화
        setSelectedOptions([...selectedOptions, option]);

        // 부모 옵션 토글 열기
        if (parentOption) {
          setShowSubOptions({...showSubOptions, [parentOption]: true});
        }
      }
    }

    // "Other" 옵션
    if (option === 'Other') {
      if (selectedOptions.includes('Other')) {
        setSelectedOptions(selectedOptions.filter(item => item !== 'Other'));
        setShowOtherInput(false);
        setOtherText('');
      } else {
        setSelectedOptions([...selectedOptions, 'Other']);
        setShowOtherInput(true);
        setIsEditingOther(true);
      }
    }

    // 단일 옵션 (부모나 하위 항목이 아닌 경우)
    else if (
      !subOptions.length &&
      !Object.values(subOptionsMap).some(sub => sub.includes(option))
    ) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(item => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const handleSaveChanges = async () => {
    const requestBody = {
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
      await api.put('/user/dr', requestBody, {
        headers: {'Content-Type': 'application/json'},
      });
      Alert.alert('Success', 'Your dietary preferences have been updated.');
    } catch (error) {
      console.error('Failed to save changes:', error);
      Alert.alert('Error', 'Failed to update your dietary preferences.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titleText}>Step 2</Text>
        <Text style={styles.infoText}>Select ingredients you should avoid</Text>
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
              />
            </TouchableOpacity>
            {subOptionsMap[option.label] && showSubOptions[option.label] && (
              <View style={styles.subOptionsContainer}>
                {subOptionsMap[option.label].map(subOption => (
                  <TouchableOpacity
                    key={subOption}
                    style={styles.subOption}
                    onPress={() => handleSelection(subOption)}>
                    <Ionicons
                      name={
                        selectedOptions.includes(subOption)
                          ? 'checkbox'
                          : 'checkbox-outline'
                      }
                      size={20}
                      color={colors.ORANGE_200}
                    />
                    <Text style={styles.subOptionText}>{subOption}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {option.label === 'Other' && showOtherInput && (
              <View style={styles.otherInputWrapper}>
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
                      onPress={() => setIsEditingOther(false)}>
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
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#fff'},
  container: {flexGrow: 1, padding: 20},
  titleText: {marginBottom: 15, fontSize: 25, fontWeight: 'bold'},
  infoText: {fontSize: 20, marginBottom: 5},
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
  optionText: {marginLeft: 10, fontSize: 16, color: '#333'},
  subOptionsContainer: {marginLeft: 40},
  subOption: {flexDirection: 'row', alignItems: 'center', marginVertical: 5},
  subOptionText: {marginLeft: 5, fontSize: 14},
  otherInputWrapper: {marginTop: 10, padding: 10, borderRadius: 10},
  centerContainer: {alignItems: 'center'},
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
  },
  otherText: {fontSize: 16, marginBottom: 10},
  submitButton: {
    backgroundColor: colors.ORANGE_800,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: colors.GRAY_700,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
  saveButton: {
    backgroundColor: colors.ORANGE_800,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default SettingsSecondScreen;
