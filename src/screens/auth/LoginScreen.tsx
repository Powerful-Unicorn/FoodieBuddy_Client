import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils';

function LoginScreen() {
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
          placeholder="Email"
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email" //골뱅이 자판 추가
          // value={values.email}
          // onChangeText={text => handleChangeText('email', text)}
          // onBlur={() => handleBlur('email')}
          {...login.getTextInputProps('email')}
        />
        <InputField
          placeholder="Password"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
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
