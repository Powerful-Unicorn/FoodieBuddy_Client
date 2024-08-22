import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthStackParamList} from '../navigations/stack/AuthStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {authNavigations} from '../constants';

type OnboardingScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.ONBOARDING
>;

function AuthHomeScreen({navigation}: OnboardingScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인 화면으로 이동하자~~"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
