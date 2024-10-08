import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View, Text, Alert} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import BookmarkContainer from '../../components/BookmarkContainer';
import {RectButton} from 'react-native-gesture-handler';
import {colors} from '../../constants';

// Define the type for a bookmark item
interface Bookmark {
  id: string;
  title: string;
  subtitle: string;
  rating: number;
}

const BookmarksScreen = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    {id: '1', title: 'Bean Sprout Soup', subtitle: 'Kongnamulguk', rating: 0},
    {id: '2', title: 'Grilled Pork Belly', subtitle: 'Samgyeopsal', rating: 0},
    {id: '3', title: 'Dumpling Soup', subtitle: 'Mandutguk', rating: 0},
    {id: '4', title: 'Dumpling Soup', subtitle: 'Mandutguk', rating: 0},
  ]);

  const deleteBookmark = (id: string) => {
    Alert.alert(
      '', // Empty string for the title
      'Are you sure you want to delete this bookmark?', // Message
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setBookmarks(prevBookmarks =>
              prevBookmarks.filter(bookmark => bookmark.id !== id),
            );
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const renderItem = ({item}: {item: Bookmark}) => (
    <BookmarkContainer
      title={item.title}
      subtitle={item.subtitle}
      initialRating={item.rating}
      onDelete={() => deleteBookmark(item.id)}
    />
  );

  const renderHiddenItem = ({item}: {item: Bookmark}) => (
    <View style={styles.rowBack}>
      <RectButton
        style={styles.deleteButton}
        onPress={() => deleteBookmark(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </RectButton>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <SwipeListView
          data={bookmarks}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75} // Adjust the swipe distance as needed
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
    //backgroundColor: colors.WHITE,
    margin: 30,
  },
  rowBack: {
    alignItems: 'center',
    height: 105, // Height adjusted to match BookmarkContainer
    flexDirection: 'row',
    justifyContent: 'flex-end',
    //paddingRight: 15,
    borderRadius: 8,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 75,
    height: '100%', // 부모의 높이에 맞게 설정
    borderRadius: 8,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookmarksScreen;
