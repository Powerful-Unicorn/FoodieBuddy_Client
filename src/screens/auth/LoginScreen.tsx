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
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setUserId} from '../../states/userSlice';

type LoginScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.LOGIN
>;

function LoginScreen({navigation}: LoginScreenProps) {
  const passwordRef = useRef<TextInput | null>(null);
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const dispatch = useDispatch();
  const handleLogin = async () => {
    const {email, password} = login.values;

    console.log('Request Params:', {email, password}); // 요청 매개변수 출력

    try {
      // GET 요청으로 로그인
      const requestBody = {
        email,
        password,
      };
      const response = await api.post('/user/login', requestBody);

      console.log('Response Data:', response.data); // 응답 데이터 출력

      // 사용자 ID를 Redux에 저장ㅁ
      dispatch(setUserId(response.data.userId));

      Alert.alert('', 'Login successful!');

      // 채팅 화면으로 이동
      navigation.reset({
        index: 0,
        routes: [{name: 'MainDrawerNavigator'}],
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error Response Data:', error.response?.data); // 에러 응답 출력
        Alert.alert(
          'Login Failed',
          error.response?.data?.message || 'Invalid email or password',
        );
      } else {
        console.error('Unexpected Error:', error);
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  const handleSubmit = () => {
    console.log('Submitted Values:', login.values); // 제출된 값 출력
    handleLogin();
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
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="Login"
        variant="filled"
        size="large"
        onPress={handleSubmit}
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
