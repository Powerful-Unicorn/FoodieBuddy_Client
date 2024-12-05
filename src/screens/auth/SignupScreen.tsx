import React, {useRef} from 'react';
import {StyleSheet, View, SafeAreaView, TextInput, Alert} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateSignup} from '../../utils';
import {authNavigations} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import api from '../../apis/api';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setUserId} from '../../states/userSlice'; // Redux 액션 가져오기
import {RootStackParamList} from '../../navigations/root/RootNavigator';

type SignupScreenProps = StackScreenProps<RootStackParamList, 'Signup'>;

function SignupScreen({navigation}: SignupScreenProps) {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null); // 비밀번호 확인 필드 참조
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  const dispatch = useDispatch(); // Redux dispatch 함수 가져오기

  const handleSignup = async () => {
    const {email, password, passwordConfirm} = signup.values;

    // 비밀번호 확인 검증
    if (password !== passwordConfirm) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const requestBody = {
      email,
      password,
    };

    try {
      const response = await api.post('/user/signup', requestBody);
      console.log('Response Data:', response.data);

      // Redux에 userId 저장
      dispatch(setUserId(response.data.userId));

      // 성공 메시지 표시 및 다음 화면으로 이동
      Alert.alert(
        '',
        'Welcome to FoodieBuddy! \nPlease select your dietary restrictions.',
      );
      navigation.navigate('DRFirst');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Error:', error.response.data);
          Alert.alert(
            'Error',
            error.response.data.message || 'Something went wrong',
          );
        } else {
          Alert.alert('Error', 'Failed to sign up');
        }
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleSubmit = () => {
    handleSignup();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        {/* 이메일 입력 필드 */}
        <InputField
          autoFocus
          placeholder="Email"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email" // 골뱅이 자판 추가
          returnKeyType="next" // 다음으로 이동할 수 있는 자판 추가
          //blurOnSubmit={false} // 키보드 안 내려가게
          onSubmitEditing={() => passwordRef.current?.focus()} // 다음 입력 필드로 포커스 이동
          {...signup.getTextInputProps('email')}
        />

        {/* 비밀번호 입력 필드 */}
        <InputField
          ref={passwordRef}
          placeholder="Password"
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          returnKeyType="next"
          //blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()} // 비밀번호 확인 필드로 포커스 이동
          {...signup.getTextInputProps('password')}
        />

        {/* 비밀번호 확인 입력 필드 */}
        <InputField
          ref={passwordConfirmRef}
          placeholder="Confirm Password"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleSubmit} // 회원가입 제출
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>

      {/* 회원가입 버튼 */}
      <CustomButton
        label="Sign up"
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

export default SignupScreen;
