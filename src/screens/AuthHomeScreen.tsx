import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function AuthHomeScreen({navigation}) {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인 화면으로 이동~!!"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
