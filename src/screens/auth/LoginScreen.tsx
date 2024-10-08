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
import {setUserId} from '../../states/userSlice'; // Redux 액션 가져오기

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

  const dispatch = useDispatch(); // Redux dispatch 함수 가져오기

  const handleSignup = async () => {
    const requestBody = {
      email: login.values.email,
      password: login.values.password,
    };

    try {
      const response = await api.post('/user/signup', requestBody);
      console.log('Response Data:', response.data);
      dispatch(setUserId(response.data.userId)); // userId를 Redux 상태에 저장
      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate(authNavigations.DRFIRST);
    } catch (error) {
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
