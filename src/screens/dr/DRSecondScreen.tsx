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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {authNavigations, colors} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import api from '../../apis/api'; // API 요청을 위한 모듈
import {useSelector} from 'react-redux'; // Redux 상태 선택자를 가져오기

type DRSecondScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.DRSECOND
>;

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

function DRSecondScreen({navigation, route}: DRSecondScreenProps) {
  const {dietRestrictions, selectedDR} = route.params; // 이전 화면에서 받아온 데이터
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
  // dietRestrictions에 따라 초기값 설정
  useEffect(() => {
    const initialSelectedOptions: string[] = [];

    // Meat 처리: "all kinds"라면 하위 항목 모두 포함
    if (dietRestrictions.meat === 'all kinds') {
      initialSelectedOptions.push('Meat', ...subOptionsMap['Meat']);
      setShowSubOptions(prev => ({...prev, Meat: true}));
    }

    // Egg, Dairy, Seafood, 기타 항목 처리
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

  // 항목 선택 핸들러
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

  // API로 요청 보낼 데이터 조합
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

  const handleSubmitOther = () => {
    setIsEditingOther(false);
  };

  // 다음 페이지로 이동하는 함수
  const handleNextButton = async () => {
    const requestBody = createRequestBody();
    console.log('Request Body: ', requestBody);

    try {
      const response = await api.put('/user/dr2', requestBody, {
        headers: {'Content-Type': 'application/json'},
      });
      console.log('Full Response Data:', response.data);
      Alert.alert('Response Data', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Error occurred:', error);
      Alert.alert('Error', 'Failed to send data');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {ingredientOptions.map(option => (
          <View key={option} style={styles.optionWrapper}>
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => handleSelection(option)}>
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

            {subOptionsMap[option] && showSubOptions[option] && (
              <View style={styles.subOptionsRow}>
                {subOptionsMap[option].map(subOption => (
                  <TouchableOpacity
                    key={subOption}
                    style={styles.subOptionContainer}
                    onPress={() => handleSubSelection(option, subOption)}>
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

            {option === 'Other' && showOtherInput && (
              <View style={styles.otherInputContainer}>
                {isEditingOther ? (
                  <View style={styles.rowContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Distinguish ingredients using comma"
                      value={otherText}
                      onChangeText={setOtherText}
                    />
                    <Button title="Submit" onPress={handleSubmitOther} />
                  </View>
                ) : (
                  <>
                    <Text style={styles.otherText}>{otherText}</Text>
                    <Button
                      title="Edit"
                      onPress={() => setIsEditingOther(true)}
                    />
                  </>
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
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
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
    height: 45,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  subOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 40,
  },
  subOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  otherText: {
    fontSize: 16,
    marginVertical: 10,
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
