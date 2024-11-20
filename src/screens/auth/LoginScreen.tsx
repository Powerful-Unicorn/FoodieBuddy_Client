import React, {useRef} from 'react';
import {StyleSheet, View, SafeAreaView, TextInput, Alert} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils';
import {authNavigations} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import api from '../../apis/api';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setUserId} from '../../states/userSlice';
import {MainDrawerParamList} from '../../navigations/drawer/MainDrawerNavigator';
import {RootStackParamList} from '../../navigations/root/RootNavigator';
// type LoginScreenProps = StackScreenProps<
//   AuthStackParamList,
//   typeof authNavigations.LOGIN
// >;

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

function LoginScreen({navigation}: LoginScreenProps) {
  const passwordRef = useRef<TextInput | null>(null);
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const dispatch = useDispatch();

  const handleLogin = async () => {
    const {email, password} = login.values;

    try {
      const response = await api.post('/user/login', {email, password});
      const userId = response.data.userId;
      dispatch(setUserId(response.data.userId));
      Alert.alert('', 'Login successful!');
      // 디버깅용 로그 추가
      console.log('[LoginScreen] Login successful. Received userId:', userId);

      // Redux에 userId 저장
      dispatch(setUserId(userId));
      // MainDrawerNavigator로 이동 (스택 초기화)
      navigation.reset({
        index: 0,
        routes: [{name: 'MainDrawerNavigator', params: {userId}}],
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          'Login Failed',
          error.response?.data?.message || 'Invalid email or password',
        );
      } else {
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
