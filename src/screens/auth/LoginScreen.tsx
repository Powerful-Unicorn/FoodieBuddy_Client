import React, {useRef} from 'react';
import {StyleSheet, View, SafeAreaView, TextInput, Alert} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils';
import {authNavigations} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import api from '../../apis/api';
import axios, {AxiosError} from 'axios';

type LoginScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.ONBOARDING
>;

function LoginScreen({navigation}: LoginScreenProps) {
  const passwordRef = useRef<TextInput | null>(null);
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  // API 호출 함수 정의
  const handleSignup = async () => {
    const requestBody = {
      email: login.values.email,
      password: login.values.password,
    };

    console.log('Request Body:', requestBody); // 요청 데이터 확인
    try {
      const response = await api.post('/user/signup', requestBody);
      console.log('Response Data:', response.data);
      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate(authNavigations.DRFIRST);
    } catch (error) {
      // error를 AxiosError 타입으로 캐스팅
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Error Data:', error.response.data);
          Alert.alert(
            'Error',
            error.response.data.message || 'Something went wrong',
          );
        } else {
          Alert.alert('Error', 'Failed to sign up');
        }
      } else {
        // AxiosError가 아닌 다른 타입의 에러 처리
        Alert.alert('Error', 'An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleSubmit = () => {
    console.log('values', login.values);
    handleSignup(); // 로그인 시도 시 handleSignup 함수 호출
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="Email"
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="Password"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="Login"
        variant="filled"
        size="large"
        onPress={handleSubmit}
        //onPress={() => navigation.navigate(authNavigations.DRFIRST)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
