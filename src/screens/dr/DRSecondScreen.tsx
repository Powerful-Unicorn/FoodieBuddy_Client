import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import {authNavigations, colors} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {ScrollView} from 'react-native';

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
]; // 메인 항목들

const subOptionsMap: {[key: string]: string[]} = {
  Dairy: ['Milk', 'Cheese'],
  Meat: ['Red Meat', 'Other Meat'],
  Seafood: ['Fish', 'Shellfish'],
  Nuts: ['Tree Nuts', 'Peanuts'],
  Fruits: ['Apple', 'Peach', 'Pear'],
  Vegetables: ['Mushroom', 'Carrot', 'Potato', 'Cucumber', 'Green onion'],
}; // 각 항목별 하위 항목들

function DRSecondScreen({navigation}: DRSecondScreenProps) {
  const [selectedDR, setSelectedDR] = useState<string[]>([]);
  const [showSubOptions, setShowSubOptions] = useState<{
    [key: string]: boolean;
  }>({
    Dairy: false,
    Meat: false,
    Seafood: false,
    Nuts: false,
  }); // 각 항목별 하위 항목 표시 여부
  const [showOtherInput, setShowOtherInput] = useState(false); // Other 항목 선택 시 input field 보여줄지 여부
  const [otherText, setOtherText] = useState(''); // Other 텍스트 입력 값
  const [isEditingOther, setIsEditingOther] = useState(true); // Other 항목 수정 여부 상태

  // 항목 선택 핸들러
  const handleSelection = (option: string) => {
    const subOptions = subOptionsMap[option] || [];

    if (subOptions.length > 0) {
      if (selectedDR.includes(option)) {
        // 메인 항목 선택 해제 시 하위 항목도 모두 해제
        setSelectedDR(
          selectedDR.filter(item => ![option, ...subOptions].includes(item)),
        );
        setShowSubOptions({...showSubOptions, [option]: false});
      } else {
        // 메인 항목 선택 시 하위 항목도 모두 선택
        setSelectedDR([...selectedDR, option, ...subOptions]);
        setShowSubOptions({...showSubOptions, [option]: true});
      }
    } else if (option === 'Other') {
      if (selectedDR.includes('Other')) {
        // Other 선택 해제 시 input field 숨기기
        setSelectedDR(selectedDR.filter(item => item !== 'Other'));
        setShowOtherInput(false);
        setOtherText(''); // 입력값 초기화
      } else {
        // Other 선택 시 input field 보이기
        setSelectedDR([...selectedDR, option]);
        setShowOtherInput(true);
        setIsEditingOther(true); // 초기 상태에서 input field가 보이게 설정
      }
    } else {
      // 다른 항목들은 일반적인 선택/해제 로직
      if (selectedDR.includes(option)) {
        setSelectedDR(selectedDR.filter(item => item !== option));
      } else {
        setSelectedDR([...selectedDR, option]);
      }
    }
  };

  // 하위 항목 선택 핸들러
  const handleSubSelection = (option: string, subOption: string) => {
    if (selectedDR.includes(subOption)) {
      setSelectedDR(selectedDR.filter(item => item !== subOption));
    } else {
      setSelectedDR([...selectedDR, subOption]);
    }
  };

  // Other 항목 제출 핸들러
  const handleSubmitOther = () => {
    console.log('Other submitted: ', otherText);
    setIsEditingOther(false); // 제출 후 input field를 일반 텍스트로 전환
  };

  // 수정 버튼 핸들러
  const handleEditOther = () => {
    setIsEditingOther(true); // "Edit" 버튼을 누르면 다시 input field로 전환
  };

  // 다음 페이지로 이동하는 함수
  const handleNextButton = () => {
    const selectedDRString = selectedDR.join(', '); // 배열을 문자열로 변환
    console.log(selectedDRString);
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

            {/* 하위 항목들: 각 항목 선택 시 표시 (가로 정렬) */}
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

            {/* Other 선택 시 input field 또는 텍스트 표시 */}
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
                    <Button title="Edit" onPress={handleEditOther} />
                  </>
                )}
              </View>
            )}
          </View>
        ))}

        {/* 하단 페이지 번호 및 이동 버튼 (중앙 정렬) */}
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
    flexGrow: 1, // ScrollView의 내용이 화면에 꽉 차도록 설정
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  optionWrapper: {
    alignItems: 'flex-start',
    backgroundColor: '#fff', // 배경색 추가
    padding: 15, // 패딩 추가
    marginVertical: 10, // 상하 간격
    borderRadius: 10, // 둥근 테두리
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {width: 0, height: 2}, // 그림자 오프셋
    shadowOpacity: 0.3, // 그림자 불투명도
    shadowRadius: 4, // 그림자 반경
    elevation: 5, // Android 그림자 효과
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: 10,
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
