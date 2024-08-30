import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

interface BookmarkContainerProps {
  title: string;
  subtitle: string;
  initialRating?: number;
}

const BookmarkContainer: React.FC<BookmarkContainerProps> = ({
  title,
  subtitle,
  initialRating = 0,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <View style={styles.bookmarkContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map(star => (
            <TouchableOpacity
              key={star}
              onPress={() => handleRating(star)}
              style={styles.starButton}>
              <Icon
                name={star <= rating ? 'star' : 'star-outline'}
                size={20}
                color={colors.ORANGE_800}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

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
    marginBottom: 25,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This pushes the ratingContainer to the right
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: 16,
    flex: 1,
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
  ratingContainer: {
    flexDirection: 'row',
  },
  starButton: {
    marginHorizontal: 1, //별 사이 간격
  },
});

export default BookmarkContainer;
