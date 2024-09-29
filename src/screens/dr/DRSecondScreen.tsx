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
]; // 추가 항목들

const dairySubOptions = ['Milk', 'Cheese']; // Dairy 하위 항목

function DRSecondScreen({navigation}: DRSecondScreenProps) {
  const [selectedDR, setSelectedDR] = useState<string[]>([]);
  const [showDairySubOptions, setShowDairySubOptions] = useState(false); // Dairy 하위 항목을 보여줄지 여부
  const [showOtherInput, setShowOtherInput] = useState(false); // Other 항목 선택 시 input field 보여줄지 여부
  const [otherText, setOtherText] = useState(''); // Other 텍스트 입력 값
  const [isEditingOther, setIsEditingOther] = useState(true); // Other 항목 수정 여부 상태

  // 항목 선택 핸들러
  const handleSelection = (option: string) => {
    if (option === 'Dairy') {
      if (selectedDR.includes('Dairy')) {
        // Dairy 선택 해제 시 하위 항목 선택 해제 및 하위 옵션 닫기
        setSelectedDR(
          selectedDR.filter(
            item => !['Dairy', ...dairySubOptions].includes(item),
          ),
        );
        setShowDairySubOptions(false); // Dairy가 선택 해제되면 하위 항목 숨기기
      } else {
        // Dairy 선택 시 하위 항목 보이기 및 Milk, Cheese 선택
        setSelectedDR([...selectedDR, 'Dairy', 'Milk', 'Cheese']); // Milk, Cheese 자동 선택
        setShowDairySubOptions(true); // Dairy가 선택되면 하위 항목 보이기
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

  // Dairy 하위 항목 선택 핸들러
  const handleDairySubSelection = (option: string) => {
    if (selectedDR.includes(option)) {
      setSelectedDR(selectedDR.filter(item => item !== option));
    } else {
      setSelectedDR([...selectedDR, option]);
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
    <View style={styles.container}>
      <Text>Ingredients:</Text>

      {ingredientOptions.map(option => (
        <View key={option}>
          {/* 메인 옵션 */}
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => handleSelection(option)}>
            <Ionicons
              name={
                selectedDR.includes(option) ? 'checkbox' : 'checkbox-outline'
              }
              size={24}
            />
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>

          {/* Dairy 하위 항목들: Dairy 선택 시 표시 */}
          {option === 'Dairy' && showDairySubOptions && (
            <View style={styles.subOptionsContainer}>
              {dairySubOptions.map(subOption => (
                <TouchableOpacity
                  key={subOption}
                  style={styles.optionContainer}
                  onPress={() => handleDairySubSelection(subOption)}>
                  <Ionicons
                    name={
                      selectedDR.includes(subOption)
                        ? 'checkbox'
                        : 'checkbox-outline'
                    }
                    size={24}
                  />
                  <Text style={styles.optionText}>{subOption}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Other 선택 시 input field 또는 텍스트 표시 */}
          {option === 'Other' && showOtherInput && (
            <View style={styles.otherInputContainer}>
              {isEditingOther ? (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Distinguish ingredients using comma"
                    value={otherText}
                    onChangeText={setOtherText}
                  />
                  <Button title="Submit" onPress={handleSubmitOther} />
                </>
              ) : (
                <>
                  <Text style={styles.otherText}>Other: {otherText}</Text>
                  <Button title="Edit" onPress={handleEditOther} />
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
          <Ionicons name="chevron-forward" size={24} color={colors.GRAY_700} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  subOptionsContainer: {
    marginLeft: 40, // 하위 항목 들여쓰기
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
    width: 200,
  },
  otherText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
