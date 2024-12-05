import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const SettingsMainScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      {/* Password Change */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('PasswordChange')}>
        <MaterialIcons name="lock" size={24} color="#FF5722" />
        <Text style={styles.optionText}>Change Password</Text>
      </TouchableOpacity>

      {/* Dietary Preferences */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('SettingsFirstScreen')}>
        <MaterialCommunityIcons
          name="food-variant-off"
          size={24}
          color="#FF5722"
        />
        <Text style={styles.optionText}>Edit Dietary Restrictions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('GeneralSettings')}>
        <MaterialIcons name="logout" size={24} color="#FF5722" />
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,

    elevation: 3,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333333',
  },
});

export default SettingsMainScreen;
