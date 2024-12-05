import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import BookmarkContainer from '../../components/BookmarkContainer';
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

  // 북마크 데이터 가져오기
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

  // 북마크 삭제
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

  // 별점 업데이트
  const updateStarRating = (menuId: number, newRating: number) => {
    setBookmarks(prevBookmarks =>
      prevBookmarks.map(bookmark =>
        bookmark.menuId === menuId
          ? {...bookmark, star: newRating} // 별점 수정
          : bookmark,
      ),
    );
  };

  useEffect(() => {
    if (userId) {
      fetchBookmarks();
    }
  }, [userId]);

  // FlatList의 렌더링 아이템
  const renderItem = ({item}: {item: Bookmark}) => (
    <BookmarkContainer
      title={item.name}
      subtitle={item.pronunciation}
      star={item.star}
      onDelete={() => deleteBookmark(item.menuId)} // 삭제 핸들러
      onStarPress={
        (rating: number) => updateStarRating(item.menuId, rating) // 별점 핸들러
      }
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
          <FlatList
            data={bookmarks}
            renderItem={renderItem}
            keyExtractor={item => item.menuId.toString()}
            contentContainerStyle={{paddingBottom: 20}} // 여백 추가
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
