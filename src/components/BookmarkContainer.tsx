import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {colors} from '../constants';

function BookmarkContainer() {
  return (
    <View style={styles.bookmarkContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>음식 이름</Text>
        <Text style={styles.subtitle}>한국어 발음</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    paddingHorizontal: 20,
  },
  bookmarkContainer: {
    backgroundColor: colors.YELLOW_200,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default BookmarkContainer;
