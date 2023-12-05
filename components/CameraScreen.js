// Importerer nødvendige komponenter fra React, React Native og Expo-pakkerne
import React, {Fragment, useEffect, useRef, useState} from "react";
import {Camera} from "expo-camera";
import {Button, Image, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {StatusBar} from "expo-status-bar";

// Funktionel komponent for kamerafunktionaliteten på skærmen
const CameraScreen = ({navigation}) => { 
    // Opretter en reference til kameraet
    const cameraRef = useRef();

    // Tilstande til at holde tilladelser, billeder og kameratype
    const [hasPermission, setHasPermission] = useState(null);
    const [imagesArr, setImagesArr] = useState([]);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [loading,setLoading] = useState(false);

    // Effekt der kører ved første rendring for at anmode om tilladelser til kamera og kamerarulle
    useEffect(() => {
        (async ()=> {
            // Anmoder om tilladelse til kameraet
            const {status} = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Beklager, vi mangler tilladelse til din kamerarulle');
            }
            // Anmoder om tilladelse til kamerarullen (kun for mobilplatforme)
            if (Platform.OS !=='web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !=='granted') {
                    alert('Beklager, vi mangler tilladelse til din kamerarulle');
                }
            }
             // Sætter tilladelsen baseret på kamera og kamerarullestatus
            setHasPermission(status==='granted');
        })();
    }, []);
    // Håndterer tilfælde hvor tilladelse ikke er givet til kameraet eller kamerarullen
    if (hasPermission=== null) {
        return <View />;
    }
    if (hasPermission === false) {
        return(
            <View style={styles.gallery}>
            <Text>No access to camera</Text>
            <Button title={"Change settings"} onPress={() => Linking.openSettings()}/>
        </View>
        )
    }
    // Funktion til at tage et billede ved brug af kameraet
    const snap = async () => {
        if (!cameraRef.current) {
            return;
        }
        setLoading(true);
        const result = await cameraRef.current.takePictureAsync();

        // Tilføjer det tagne billede til listen af billeder
        setImagesArr((imagesArr) => [result].concat(imagesArr));
        setLoading(false);
    };
    // Funktion til at vise galleriet med de tagne billeder
    const CameraGallery = () => {
        return (
            <View style={styles.gallery}>
            <Text style={styles.buttonGallery}>Billeder taget: {imagesArr.length}</Text>
            <ScrollView horizontal={true} >
                {
                    imagesArr.length > 0
                        ? imagesArr.map((image,index) => (
                            <TouchableOpacity key={index} style={{paddingHorizontal:10}} onPress={() => navigation.navigate('image',{image:image.uri}) } >
                                <Image source={{ uri: image.uri }} style={{ width: 100, height: 200 }} />
                            </TouchableOpacity>
                        ))
                        : <Text style={{color:"white"}}> No images taken </Text>
                }
            </ScrollView>
        </View>
        )
    };
    // Funktion til at vælge et billede fra kamerarullen
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            // Tilføjer det valgte billede til listen af billeder
            setImagesArr((imagesArr) => [result].concat(imagesArr));
        }
    };
    // Renderer komponenten med kameraviewet, knapper og galleri
    return (
        <Fragment>
            <StatusBar StatusBarStyle="dark-content" style={{fontcolor:"white"}} backgroundColor={'rgba(255,255,255,0.4)'} />
            <View style={styles.container}>
                <Camera style={styles.camera} type={type} ref={cameraRef}>
                    <View style={{flexDirection:"column",alignContent:"center",flex:1,padding:20}}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setType(
                                        type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back
                                    );
                                }}>
                                <Text style={styles.text}> Flip </Text>
                            </TouchableOpacity>

                            {}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={snap}
                            >
                                <Text style={styles.text}>
                                    {loading ? "Loading..." :"Tag billede"}
                                </Text>
                            </TouchableOpacity>

                            {/*Flip kamera*/}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={pickImage}
                            >
                                <Text style={styles.text}> Galleri </Text>
                            </TouchableOpacity>
                        </View>
                        <CameraGallery/>
                    </View>
                </Camera>
            </View>
        </Fragment>
    );
}
// Stilark til komponenten
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1, 
        backgroundColor: 'transparent',
        justifyContent:"space-between",
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    buttonGallery: {
        fontSize: 15,
        color:"white",
        padding: 10,
        borderRadius:10,
        alignSelf: 'center',
    },
    button: {
        padding:5,
        alignSelf: 'flex-end'
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    gallery:{
        flex: 0.4,
        paddingTop:20,
        width:"100%",
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CameraScreen; 