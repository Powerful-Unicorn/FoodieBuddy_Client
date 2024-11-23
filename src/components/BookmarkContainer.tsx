import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

interface BookmarkContainerProps {
  title: string;
  subtitle: string;
  star: number; // 별점
  onDelete: () => void; // 북마크 삭제 핸들러
}

const BookmarkContainer: React.FC<BookmarkContainerProps> = ({
  title,
  subtitle,
  star,
  onDelete,
}) => {
  // 별점 렌더링 함수
  const renderStars = (star: number) => {
    return [1, 2, 3, 4, 5].map(starIndex => (
      <Icon
        key={starIndex}
        name={starIndex <= star ? 'star' : 'star-outline'}
        size={20}
        color={colors.ORANGE_800}
        style={styles.starIcon}
      />
    ));
  };

  return (
    <View style={styles.card}>
      {/* 삭제 버튼: 상단 */}
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Icon name="trash-outline" size={22} color={colors.RED_500} />
      </TouchableOpacity>

      {/* 텍스트와 별점: 중앙 */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.ratingContainer}>{renderStars(star)}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.YELLOW_200,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,

    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8, // 버튼 클릭 영역 확대
  },
  contentContainer: {
    alignItems: 'center', // 텍스트와 별점을 중앙 정렬
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.GRAY_700,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row', // 별점 수평 배치
    justifyContent: 'center', // 중앙 정렬
    marginTop: 8,
  },
  starIcon: {
    marginHorizontal: 2, // 별 사이 간격
  },
});

export default BookmarkContainer;
