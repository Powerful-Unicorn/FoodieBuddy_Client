import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {authNavigations, colors, mainNavigations} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';

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
  const {dietRestrictions} = route.params;
  const [selectedDR, setSelectedDR] = useState<string[]>([]);
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

  // dietRestrictions에 따라 초기값 설정
  useEffect(() => {
    const initialSelectedDR: string[] = [];

    // Meat 처리: "all kinds"라면 하위 항목 모두 포함
    if (dietRestrictions.meat === 'all kinds') {
      initialSelectedDR.push('Meat', ...subOptionsMap['Meat']);
      setShowSubOptions(prev => ({...prev, Meat: true}));
    }

    // Egg, Dairy, Seafood, 기타 항목 처리
    if (dietRestrictions.egg === true) initialSelectedDR.push('Egg');
    if (dietRestrictions.dairy) initialSelectedDR.push('Dairy');
    if (dietRestrictions.seafood) initialSelectedDR.push('Seafood');
    if (dietRestrictions.nuts) initialSelectedDR.push('Nuts');
    if (dietRestrictions.gluten === true) initialSelectedDR.push('Gluten');
    if (dietRestrictions.fruit) initialSelectedDR.push('Fruits');
    if (dietRestrictions.vegetable) initialSelectedDR.push('Vegetables');
    if (dietRestrictions.other) {
      initialSelectedDR.push('Other');
      setShowOtherInput(true);
      setIsEditingOther(false);
    }

    setSelectedDR(initialSelectedDR);
  }, [dietRestrictions]);

  // 항목 선택 핸들러
  const handleSelection = (option: string) => {
    const subOptions = subOptionsMap[option] || [];

    if (subOptions.length > 0) {
      if (selectedDR.includes(option)) {
        setSelectedDR(
          selectedDR.filter(item => ![option, ...subOptions].includes(item)),
        );
        setShowSubOptions({...showSubOptions, [option]: false});
      } else {
        setSelectedDR([...selectedDR, option, ...subOptions]);
        setShowSubOptions({...showSubOptions, [option]: true});
      }
    } else if (option === 'Other') {
      if (selectedDR.includes('Other')) {
        setSelectedDR(selectedDR.filter(item => item !== 'Other'));
        setShowOtherInput(false);
        setOtherText('');
      } else {
        setSelectedDR([...selectedDR, option]);
        setShowOtherInput(true);
        setIsEditingOther(true);
      }
    } else {
      if (selectedDR.includes(option)) {
        setSelectedDR(selectedDR.filter(item => item !== option));
      } else {
        setSelectedDR([...selectedDR, option]);
      }
    }
  };

  const handleSubSelection = (option: string, subOption: string) => {
    if (selectedDR.includes(subOption)) {
      setSelectedDR(selectedDR.filter(item => item !== subOption));
    } else {
      setSelectedDR([...selectedDR, subOption]);
    }
  };

  const handleSubmitOther = () => {
    setIsEditingOther(false);
  };

  const handleNextButton = () => {
    const selectedDRString = selectedDR.join(', ');
    console.log(selectedDRString);
    // 다음 페이지로 이동 로직
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {ingredientOptions.map(option => (
          <View key={option} style={styles.optionWrapper}>
            {/* 메인 옵션 */}
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => handleSelection(option)}>
              <Ionicons
                name={
                  selectedDR.includes(option) ? 'checkbox' : 'checkbox-outline'
                }
                size={24}
                color={colors.ORANGE_800}
              />
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>

            {/* 하위 항목들 */}
            {subOptionsMap[option] && showSubOptions[option] && (
              <View style={styles.subOptionsRow}>
                {subOptionsMap[option].map(subOption => (
                  <TouchableOpacity
                    key={subOption}
                    style={styles.subOptionContainer}
                    onPress={() => handleSubSelection(option, subOption)}>
                    <Ionicons
                      name={
                        selectedDR.includes(subOption)
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

            {/* Other 항목 처리 */}
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
