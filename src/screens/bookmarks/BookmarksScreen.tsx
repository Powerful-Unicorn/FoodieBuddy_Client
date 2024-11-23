import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import BookmarkContainer from '../../components/BookmarkContainer';
import {RectButton} from 'react-native-gesture-handler';
import {colors} from '../../constants';
import {useSelector} from 'react-redux';
import {RootState} from '../../states/store';
import api from '../../apis/api';

interface Bookmark {
  menuId: number;
  isBookmarked: boolean;
  name: string;
  pronunciation: string;
  star: number;
}

const BookmarksScreen = () => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/menu/${userId}`);
      setBookmarks(response.data);
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
      Alert.alert('Error', 'Failed to load bookmarks.');
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (menuId: number) => {
    try {
      const response = await api.patch(`/menu/bookmark/${userId}`, {menuId});
      const updatedBookmark = response.data;
      setBookmarks(prevBookmarks => [...prevBookmarks, updatedBookmark]);
      Alert.alert('Success', 'Bookmark added successfully!');
    } catch (error) {
      console.error('Failed to add bookmark:', error);
      Alert.alert('Error', 'Failed to add bookmark.');
    }
  };

  const deleteBookmark = (menuId: number) => {
    Alert.alert('', 'Are you sure you want to delete this bookmark?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => {
          setBookmarks(prevBookmarks =>
            prevBookmarks.filter(bookmark => bookmark.menuId !== menuId),
          );
        },
        style: 'destructive',
      },
    ]);
  };

  useEffect(() => {
    if (userId) {
      fetchBookmarks();
    }
  }, [userId]);

  const renderItem = ({item}: {item: Bookmark}) => (
    <BookmarkContainer
      title={item.name}
      subtitle={item.pronunciation}
      star={item.star}
      // isBookmarked={item.isBookmarked}
      // onBookmark={() => addBookmark(item.menuId)}
      onDelete={() => deleteBookmark(item.menuId)}
    />
  );

  return (
    <View style={styles.wrapper}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.GRAY_500} />
          <Text style={styles.loadingText}>Loading bookmarks...</Text>
        </View>
      ) : bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookmarks found.</Text>
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <SwipeListView
            data={bookmarks}
            renderItem={renderItem}
            keyExtractor={item => item.menuId.toString()}
          />
        </SafeAreaView>
      )}
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
    margin: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.GRAY_500,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: colors.GRAY_500,
  },
});

export default BookmarksScreen;
