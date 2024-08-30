import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {colors} from '../../constants';
import BookmarkContainer from '../../components/BookmarkContainer';

const BookmarksScreen = () => {
  // Example data, you can replace it with your actual data.
  const bookmarks = [
    {id: 1, title: 'Bean Sprout Soup', subtitle: 'Kongnamulguk', rating: 3},
    {id: 2, title: 'Grilled Pork Belly', subtitle: 'Samgyeopsal', rating: 2},
    {id: 3, title: 'Dumpling Soup', subtitle: 'Mandutguk', rating: 2},
  ];

  return (
    <SafeAreaView style={styles.container}>
      {bookmarks.map(bookmark => (
        <BookmarkContainer
          key={bookmark.id}
          title={bookmark.title}
          subtitle={bookmark.subtitle}
          initialRating={bookmark.rating}
        />
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
});

export default BookmarksScreen;
