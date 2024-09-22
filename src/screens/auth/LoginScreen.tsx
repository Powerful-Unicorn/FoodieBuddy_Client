import React, {useRef} from 'react';
import {StyleSheet, View, SafeAreaView, TextInput, Alert} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils';
import {authNavigations} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';

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
    const url = 'https://api.foodiebuddy.kro.kr/user/signup';
    const requestBody = {
      email: login.values.email,
      password: login.values.password,
    };

    console.log('Request Body:', requestBody); // 요청 데이터 확인
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 데이터 전송
        },
        body: JSON.stringify(requestBody), // 이메일과 비밀번호를 JSON 형식으로 변환
      });
      console.log('Response Status:', response.status); // 응답 상태 코드 확인
      console.log('Response Status Text:', response.statusText); // 상태 텍스트 로그 추가

      if (response.ok) {
        const data = await response.json(); // 서버로부터 받은 응답을 JSON으로 변환
        console.log('Response Data:', data);
        Alert.alert('Success', 'User registered successfully!');
        navigation.navigate(authNavigations.DRFIRST); // 성공 시 다음 화면으로 이동
      } else {
        const errorData = await response.json();
        console.log('Error Data:', errorData);
        Alert.alert('Error', errorData.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign up');
      console.error('Signup error:', error);
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
