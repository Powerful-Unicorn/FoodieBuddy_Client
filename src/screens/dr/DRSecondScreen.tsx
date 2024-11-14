import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {authNavigations, colors} from '../../constants';

type DRSecondScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.DRSECOND
>;

const ingredientOptions = [
  {
    label: 'Meat',
    icon: <MaterialCommunityIcons name="food-drumstick" size={30} />,
  },
  {
    label: 'Egg',
    icon: <Ionicons name="egg" size={30} />,
  },
  {
    label: 'Dairy',
    icon: <MaterialCommunityIcons name="cow" size={30} />,
  },
  {
    label: 'Seafood',
    icon: <Ionicons name="fish" size={30} />,
  },
  {
    label: 'Nuts',
    icon: <MaterialCommunityIcons name="peanut" size={30} />,
  },
  {
    label: 'Gluten',
    icon: <FontAwesome6 name="wheat-awn" size={30} />,
  },
  {
    label: 'Fruits',
    icon: <FontAwesome name="apple" size={30} />,
  },
  {
    label: 'Vegetables',
    icon: <FontAwesome name="leaf" size={30} />,
  },
  {
    label: 'Other',
    icon: <MaterialCommunityIcons name="pencil-plus" size={30} />,
  },
];

const subOptionsMap: {[key: string]: string[]} = {
  Dairy: ['Milk', 'Cheese'],
  Meat: ['Red Meat', 'Other Meat'],
  Seafood: ['Fish', 'Shellfish'],
  Nuts: ['Tree Nuts', 'Peanuts'],
  Fruits: ['Apple', 'Peach', 'Pear'],
  Vegetables: ['Mushroom', 'Carrot', 'Potato', 'Cucumber', 'Green onion'],
};

function DRSecondScreen({navigation}: DRSecondScreenProps) {
  const [selectedDR, setSelectedDR] = useState<string[]>([]);
  const [showSubOptions, setShowSubOptions] = useState<{
    [key: string]: boolean;
  }>({});

  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [isEditingOther, setIsEditingOther] = useState(true);

  const handleSelection = (option: string) => {
    const subOptions = subOptionsMap[option] || [];

    if (subOptions.length > 0) {
      if (selectedDR.includes(option)) {
        setSelectedDR(
          selectedDR.filter(item => ![option, ...subOptions].includes(item)),
        );
        setShowSubOptions({...showSubOptions, [option]: false});
      } else {
        setSelectedDR([...selectedDR, option, ...subOptions]);
        setShowSubOptions({...showSubOptions, [option]: true});
      }
    } else if (option === 'Other') {
      if (selectedDR.includes('Other')) {
        setSelectedDR(selectedDR.filter(item => item !== 'Other'));
        setShowOtherInput(false);
        setOtherText('');
      } else {
        setSelectedDR([...selectedDR, option]);
        setShowOtherInput(true);
        setIsEditingOther(true);
      }
    } else {
      if (selectedDR.includes(option)) {
        setSelectedDR(selectedDR.filter(item => item !== option));
      } else {
        setSelectedDR([...selectedDR, option]);
      }
    }
  };

  const handleNextButton = () => {
    console.log(selectedDR);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Step 2</Text>
          <Text style={styles.infoText}>
            Select ingredients you should avoid
          </Text>
          <View style={styles.container}>
            {ingredientOptions.map(({label, icon}) => (
              <View key={label} style={styles.optionWrapper}>
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => handleSelection(label)}>
                  {icon}
                  <Text style={styles.optionText}>{label}</Text>
                  <Ionicons
                    name={
                      selectedDR.includes(label)
                        ? 'checkbox'
                        : 'checkbox-outline'
                    }
                    size={24}
                    color={colors.ORANGE_800}
                  />
                </TouchableOpacity>

                {subOptionsMap[label] && showSubOptions[label] && (
                  <View style={styles.subOptionsRow}>
                    {subOptionsMap[label].map(subOption => (
                      <TouchableOpacity
                        key={subOption}
                        style={styles.subOptionContainer}
                        onPress={() =>
                          setSelectedDR(prev =>
                            prev.includes(subOption)
                              ? prev.filter(item => item !== subOption)
                              : [...prev, subOption],
                          )
                        }>
                        <Ionicons
                          name={
                            selectedDR.includes(subOption)
                              ? 'checkbox'
                              : 'checkbox-outline'
                          }
                          size={20}
                          color={colors.ORANGE_200}
                        />
                        <Text style={styles.subOptionText}>{subOption}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {label === 'Other' && showOtherInput && (
                  <View style={styles.otherInputContainer}>
                    {isEditingOther ? (
                      <TextInput
                        style={styles.input}
                        placeholder="Enter custom ingredients"
                        value={otherText}
                        onChangeText={setOtherText}
                      />
                    ) : (
                      <Text>{otherText}</Text>
                    )}
                  </View>
                )}
              </View>
            ))}

            <View style={styles.navigationContainer}>
              <TouchableOpacity
                style={styles.navBtn}
                onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={colors.GRAY_700}
                />
              </TouchableOpacity>
              <Text style={styles.pageNumber}>2</Text>
              <TouchableOpacity
                style={styles.navBtn}
                onPress={handleNextButton}>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={colors.GRAY_700}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {flexGrow: 1},
  container: {flex: 1, paddingHorizontal: 15, paddingVertical: 5},
  optionWrapper: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  titleText: {
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 20,
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {marginLeft: 10, fontSize: 16, fontWeight: '500'},
  subOptionsRow: {marginLeft: 30, marginTop: 10, flexWrap: 'wrap'},
  subOptionContainer: {flexDirection: 'row', alignItems: 'center', margin: 5},
  subOptionText: {marginLeft: 5, fontSize: 14},
  otherInputContainer: {marginTop: 10},
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  navBtn: {padding: 10},
  pageNumber: {fontSize: 16, fontWeight: 'bold', marginHorizontal: 10},
});

export default DRSecondScreen;
