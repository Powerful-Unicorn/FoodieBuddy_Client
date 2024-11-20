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
import axios from 'axios';
import {colors} from '../../constants';
import {useSelector} from 'react-redux';
import {RootState} from '../../states/store'; // Redux 상태 타입 가져오기

interface Bookmark {
  id: string;
  title: string;
  subtitle: string;
  rating: number;
}

const BookmarksScreen = () => {
  const userId = useSelector((state: RootState) => state.user.userId); // Redux에서 userId 가져오기
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  // 북마크 목록을 가져오는 함수
  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/menu/${userId}`); // Redux에서 가져온 userId 사용
      setBookmarks(response.data); // 서버에서 받은 데이터를 상태로 설정
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
      Alert.alert('Error', 'Failed to load bookmarks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBookmarks(); // userId가 존재할 경우에만 API 호출
    }
  }, [userId]);

  const deleteBookmark = (id: string) => {
    Alert.alert(
      '',
      'Are you sure you want to delete this bookmark?',
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.GRAY_500} />
        <Text style={styles.loadingText}>Loading bookmarks...</Text>
      </View>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No bookmarks found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <SwipeListView
          data={bookmarks}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
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
    margin: 30,
  },
  rowBack: {
    alignItems: 'center',
    height: 105,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 8,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 75,
    height: '100%',
    borderRadius: 8,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
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
    backgroundColor: colors.WHITE,
  },
  emptyText: {
    fontSize: 18,
    color: colors.GRAY_500,
  },
});

export default BookmarksScreen;
