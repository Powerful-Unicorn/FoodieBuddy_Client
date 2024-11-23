import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

interface BookmarkContainerProps {
  title: string;
  subtitle: string;
  star: number; // 현재 별점
  onDelete: () => void; // 북마크 삭제 핸들러
  onStarPress: (rating: number) => void; // 별점 클릭 핸들러
}

const BookmarkContainer: React.FC<BookmarkContainerProps> = ({
  title,
  subtitle,
  star,
  onDelete,
  onStarPress,
}) => {
  // 별점 렌더링 함수
  const renderStars = () =>
    [1, 2, 3, 4, 5].map(starIndex => (
      <TouchableOpacity
        key={starIndex}
        onPress={() => onStarPress(starIndex)} // 별점 클릭 핸들러 호출
        style={styles.starTouchable}>
        <Icon
          name={starIndex <= star ? 'star' : 'star-outline'} // 선택한 별점까지만 채워짐
          size={20}
          color={colors.ORANGE_800}
          style={styles.starIcon}
        />
      </TouchableOpacity>
    ));

  return (
    <View style={styles.card}>
      {/* 삭제 버튼 */}
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Icon name="trash-outline" size={22} color={colors.RED_500} />
      </TouchableOpacity>

      {/* 제목, 설명, 별점 */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.ratingContainer}>{renderStars()}</View>
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
    padding: 12,
  },
  deleteButtonContainer: {
    width: 40, // 넓은 터치 영역
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  contentContainer: {
    alignItems: 'center',
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  starTouchable: {
    padding: 4,
  },
  starIcon: {
    marginHorizontal: 2,
  },
});

export default BookmarkContainer;
