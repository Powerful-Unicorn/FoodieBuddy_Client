import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {authNavigations} from '../../navigations/navigations';
import CustomButton from '../../components/CustomButton';

type OnboardingScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.ONBOARDING
>;

function AuthHomeScreen({navigation}: OnboardingScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/circleLogo.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="Login"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <CustomButton
          label="Sign Up"
          variant="outlined"
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, margin: 30, alignItems: 'center'},
  imageContainer: {
    flex: 1.5,
    width: Dimensions.get('screen').width / 1.5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    gap: 15,
  },
});

export default AuthHomeScreen;
