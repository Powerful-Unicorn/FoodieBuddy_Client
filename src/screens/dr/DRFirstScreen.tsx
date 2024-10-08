import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {authNavigations, colors} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import api from '../../apis/api';
import axios from 'axios';
import {useSelector} from 'react-redux'; // Redux 상태 선택자를 가져오기

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
  const userId = useSelector((state: any) => state.user.userId); // Redux에서 userId 가져오기

  // 항목 선택 핸들러
  const handleSelection = (option: string) => {
    if (selectedDR.includes(option)) {
      setSelectedDR(selectedDR.filter(item => item !== option));
    } else {
      setSelectedDR([...selectedDR, option]);
    }
  };

  // 서버로 API 요청 보내는 함수
  const handleNextButton = async () => {
    const requestBody = {
      religion: '',
      vegetarian: selectedDR.join(', '), // 선택한 식단 정보를 서버에 보냄
      userId: userId, // Redux에서 가져온 유저 ID 사용
    };

    try {
      const response = await api.post('/user/dr1', requestBody);
      console.log('Response Data:', response.data);

      const {
        meat,
        egg,
        dairy,
        seafood,
        nuts,
        gluten,
        fruits,
        vegetables,
        other,
      } = response.data;

      // Alert로 받은 응답 내용을 보여줌
      Alert.alert(
        'Diet Preferences',
        `Meat: ${meat || 'None'}, Egg: ${egg}, Dairy: ${dairy || 'None'}, 
      Seafood: ${seafood || 'None'}, Nuts: ${nuts || 'None'}, 
      Gluten: ${gluten}, Fruits: ${fruits || 'None'}, 
      Vegetables: ${vegetables || 'None'}, Other: ${other || 'None'}`,
      );

      // 다음 페이지로 이동하고 선택한 데이터를 전달
      navigation.navigate(authNavigations.DRSECOND, {
        selectedDR: selectedDR.join(', '), // 선택된 식사 제한 사항을 두 번째 페이지로 전달
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Error Data:', error.response.data);
          Alert.alert(
            'Error',
            error.response.data.message || 'Failed to fetch preferences',
          );
        } else {
          Alert.alert('Error', 'Failed to fetch preferences');
        }
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
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
