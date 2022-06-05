import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { useState } from "react";
import { 
    View, 
    SafeAreaView, 
    Text, 
    TouchableOpacity,
    Platform,
    FlatList,
    Image,
    StyleSheet
} from "react-native";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectTravelTime } from "../slices/navSlice";
import "intl";
import "intl/locale-data/jsonp/en-US";

const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: require("../assets/images/uber-x.png")
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: require("../assets/images/uber-xl.png")
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: require("../assets/images/uber-lux.png")
    }
];

const surchargeRate = 1.5;

export default function RideOptionsCard() {

    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTime = useSelector(selectTravelTime);

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            {Platform.OS === "ios" ? (
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("NavigateCard")}
                        style={tw`absolute top-3 left-5 p-3 rounded-full`}
                    >
                        <Icon
                            name="chevron-left"
                            type="font-awesome" 
                        />
                    </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a Ride</Text>
                </View>
            ) : (
                <Text style={tw`text-center py-5 text-xl -mb-3 -mt-3`}>
                    Select a Ride - {travelTime?.distance.text}
                </Text>
            )}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row items-center justify-between px-10 -mt-2 
                        ${item.id === selected?.id && "bg-gray-200"}`}
                    >
                        <Image
                            style={styles.image}
                            source={item.image}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
                            <Text>{travelTime?.duration.text}</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat("en-us", {
                                style: "currency",
                                currency: "USD"
                            }).format(
                                (travelTime?.duration.value * surchargeRate * item.multiplier / 100)
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={tw`items-center`}>
                <TouchableOpacity
                    disabled={!selected}
                    style={tw`bg-black rounded-full p-2 w-80 mb-2 ${!selected && "bg-gray-300"}`}
                >
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        resizeMode: "contain"
    }
});