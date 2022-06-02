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
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

export default function HomeScreen() {

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
            <Image
            style={styles.logo}
            source={require("./../assets/images/uber-logo.png")}
            />
            <GooglePlacesAutocomplete
                placeholder="Where are you now?"
                styles={{
                    container: {
                        flex: 0
                    },
                    textInput: {
                        fontSize: 18
                    }
                }}
                onPress={(data, details = null) => {
                    dispatch(
                        setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        })
                    );

                    dispatch(setDestination(null));
                }}
                fetchDetails={true}
                enablePoweredByContainer={false}
                returnKeyType={"search"}
                minLength={2}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
                query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: "en"
                }}
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