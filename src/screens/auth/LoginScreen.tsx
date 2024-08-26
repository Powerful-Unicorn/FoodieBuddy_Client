import React, {useRef} from 'react';
import {StyleSheet, View, Text, SafeAreaView, TextInput} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils';

function LoginScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  console.log(login.getTextInputProps('email'));

  const handleSubmit = () => {
    console.log('values', login.values);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus // 창 열렸을 때 바로 타이핑 할 수 있도록
          placeholder="Email"
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email" //골뱅이 자판 추가
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()} //다음 칸에 바로 넘어가기
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="Password"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={handleSubmit} //바로 로그인 버튼 누르기
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
