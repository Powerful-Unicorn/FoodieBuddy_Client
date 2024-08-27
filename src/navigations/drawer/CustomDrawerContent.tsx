import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Image, StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {colors} from '../../constants';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  // //로그인 구현 후
  //     const { getProfileQuery } = useAuth();
  //     const {email,nickname, imageUri}=getProfileQuery.data||{}
  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../../assets/circleLogo.png')}
          />
        </View>
        <DrawerItemList {...props} />
        {/* <Text style={styles.nameText}>닉네임</Text> */}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
  },
  nameText: {
    color: colors.BLACK,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CustomDrawerContent;
