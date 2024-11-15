import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants';
import api from '../../apis/api';

import {SettingsStackParamList} from '../../navigations/stack/SettingsStackNavigator';
const dietaryOptions = [
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

type SettingsFirstScreenProps = StackScreenProps<
  SettingsStackParamList,
  'SettingsFirstScreen'
>;

function SettingsFirstScreen({navigation}: SettingsFirstScreenProps) {
  const userId = useSelector((state: any) => state.user.userId);
  const [selectedDR, setSelectedDR] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 추가

  // 초기 데이터 불러오기
  useEffect(() => {
    const fetchDietaryData = async () => {
      setLoading(true); // 로딩 시작
      try {
        const response = await api.get(`/user/dr/${userId}`);
        setSelectedDR(
          response.data.vegetarian.split(', ').filter((item: string) => item),
        );
      } catch (error) {
        console.error('Failed to fetch dietary data:', error);
        Alert.alert(
          'Error',
          'Failed to load dietary information. Please try again later.',
        );
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchDietaryData();
  }, [userId]);

  // 항목 선택 핸들러
  const handleSelection = (option: string) => {
    if (selectedDR.includes(option)) {
      setSelectedDR(selectedDR.filter(item => item !== option));
    } else {
      setSelectedDR([...selectedDR, option]);
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    navigation.navigate('SettingsSecondScreen', {selectedDR});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Step 1: Dietary Preferences</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.ORANGE_800} /> // 로딩 표시
      ) : (
        dietaryOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionWrapper,
              selectedDR.includes(option) && styles.selectedOption, // 선택된 옵션 스타일
            ]}
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
        ))
      )}

      <Button
        title="Next"
        onPress={handleNext}
        disabled={selectedDR.length === 0 || loading} // 선택 항목 없거나 로딩 중일 때 비활성화
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
  },
  selectedOption: {
    //backgroundColor: colors.ORANGE_200, // 선택된 옵션 배경 색
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SettingsFirstScreen;
