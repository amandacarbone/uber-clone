import {
    Text, 
    View, 
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import tw from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
    {
        id: "123",
        title: "Get a Ride",
        image: require("../assets/images/uber-x.png"),
        screen: "MapScreen"
    },
    {
        id: "456",
        title: "Order Food",
        image: require("../assets/images/eats-image.png"),
        screen: "EatsScreen"
    }
];

export default function NavOptions() {

  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
            <TouchableOpacity
                onPress={() => navigation.navigate(item.screen)}
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
                disabled={!origin}
            >
                <View style={tw`${!origin && 'opacity-20'}`}>
                    <Image
                        style={styles.image}
                        source={item.image}
                    />
                    <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                    <Icon
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        name='arrowright'
                        color='white'
                        type='antdesign'
                    />
                </View>
            </TouchableOpacity>
        )}
    />
  );
  
};

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        resizeMode: "contain"
    }
});