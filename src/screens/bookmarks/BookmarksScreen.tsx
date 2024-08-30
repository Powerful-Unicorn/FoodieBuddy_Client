import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {colors} from '../../constants';
import BookmarkContainer from '../../components/BookmarkContainer';

function BookmarksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <BookmarkContainer />
      <BookmarkContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
});

export default BookmarksScreen;
