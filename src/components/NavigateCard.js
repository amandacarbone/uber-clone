import { 
    Text, 
    View, 
    SafeAreaView,
    StyleSheet 
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavorites from "./NavFavorites";

export default function NavigateCard() {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    function getGreeting() {

        let date = new Date();
        let hours = date.getHours();

        let greeting;

        if (hours < 12) {
            greeting = "Morning";
        } else if (hours >= 12 && hours <= 17) {
            greeting = "Afternoon";
        } else if (hours >= 17 && hours <= 24) {
            greeting = "Evening";
        }

        return greeting;

    }

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good {getGreeting()}, Amanda.</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        placeholder="Where to?"
                        styles={styles}
                        fetchDetails={true}
                        returnKeyType="search"
                        minLength={2}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description
                                })
                            );

                            navigation.navigate("RideOptionsCard");
                        }}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_MAPS_API_KEY,
                            language: "en"
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                    />
                </View>
                <NavFavorites/>
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: "#DFDFDF",
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
});