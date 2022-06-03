import { Icon } from "@rneui/base";
import {
    Text,
    View, 
    FlatList,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import tw from "tailwind-react-native-classnames";

const data = [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: "Wyandotte, MI, USA"
    },
    {
        id: "456",
        icon: "briefcase",
        location: "Work",
        destination: "Holly, MI, USA"
    }
];

export default function NavFavorites() {

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View
                    style={[tw`bg-gray-200`, styles.separator]}
                />
            )}
            renderItem={({ item: { location, destination, icon } }) => (
                <TouchableOpacity style={tw`flex-row items-center p-5`}>
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>{location}</Text>
                        <Text style={tw`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );

};

const styles = StyleSheet.create({
    separator: {
        height: 0.5
    }
});