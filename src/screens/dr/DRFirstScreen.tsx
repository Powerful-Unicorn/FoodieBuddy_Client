import React, {useState} from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {authNavigations, colors} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {ScrollView} from 'react-native';

type DRFirstScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.DRFIRST
>;

const dietaryOptions = [
  'Kosher',
  'Halal',
  'Hindu',
  'Buddist',
  'Vegan',
  'Lacto',
  'Ovo',
  'Lacto-ovo',
  'Pescatarian',
  'Pollotaraian',
];

function DRFirstScreen({navigation}: DRFirstScreenProps) {
  const [selectedDR, setSelectedDR] = useState<string[]>([]);

  // 항목 선택 핸들러
  const handleSelection = (option: string) => {
    if (selectedDR.includes(option)) {
      // 이미 선택된 항목이면 선택 해제
      setSelectedDR(selectedDR.filter(item => item !== option));
    } else {
      // 선택되지 않은 항목이면 추가
      setSelectedDR([...selectedDR, option]);
    }
  };

  // 다음 페이지로 이동하는 함수
  const handleNextButton = () => {
    const selectedDRString = selectedDR.join(', '); // 배열을 문자열로 변환
    navigation.navigate(authNavigations.DRSECOND, {
      selectedDR: selectedDRString,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {dietaryOptions.map(option => (
          <View key={option} style={[styles.optionWrapper, styles.shadowStyle]}>
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
          </View>
        ))}

        {/* 페이지 이동 */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  optionWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
