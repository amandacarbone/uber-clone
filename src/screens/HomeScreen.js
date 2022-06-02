import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView,
    Image
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";

export default function HomeScreen() {

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
            <Image
            style={styles.logo}
            source={require("./../assets/images/uber-logo.png")}
            />
            <GooglePlacesAutocomplete
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
                placeholder="Where are you now?"
            />
            <NavOptions/>
        </View>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain"
    }
});