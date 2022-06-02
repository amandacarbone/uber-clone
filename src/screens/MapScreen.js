import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import Map from "../../components/Map";
import MapView from "react-native-maps";

export default function MapScreen() {

    return (
        <View>
            <View style={tw`h-1/2`}>
                <Map/>
            </View>
            <View style={tw`h-1/2`}>

            </View>
        </View>
    );

};