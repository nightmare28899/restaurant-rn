import {useEffect, useRef, useState} from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    View,
    ActivityIndicator,
    PermissionsAndroid,
    Alert,
} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker, Region} from 'react-native-maps';
import {Button, TextInput, IconButton, Card, Text} from 'react-native-paper';
import ActionSheetBase from '../components/actionSheet/ActionSheetBase.tsx';

const HomeScreen = () => {
    const apiKey = 'AIzaSyBrulJTy71RsZ_p-uLzOU0_35Lwn1HOLJ0';

    const [text, setText] = useState<string>('');
    const [region, setRegion] = useState<Region | null>(null);
    const [loading, setLoading] = useState(true);
    const [placeSelected, setPlaceSelected] = useState<any>(null);
    const [placeDataSelected, setPlaceDataSelected] = useState<any>(null);
    const mapRef = useRef<MapView>(null);
    const [showImagePlace, setShowImagePlace] = useState<string>("");
    const actionSheetRef = useRef<ActionSheetRef>(null);

    const showActionSheet = () => {
        if (actionSheetRef.current) {
            actionSheetRef.current.show();
            //setActionSheetRef(actionSheetRef.current);
        }
    };

    async function handlePoiClick(e: any) {
        const {name, coordinate, placeId} = e.nativeEvent;

        setPlaceSelected({name, coordinate, placeId});
        await getLocationInfo({placeId}).then(data => {
            console.log(data);
            const imagePlace = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data.photos[0].photo_reference}&key=${apiKey}`
            setShowImagePlace(imagePlace);
            setPlaceDataSelected(data);
        });
    }

    async function getLocationInfo({placeId}: { placeId: string }) {
        if (placeId) {
            const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,photos,rating,geometry&key=${apiKey}`;
            try {
                const response = await fetch(url);
                const data = await response.json();

                return data.result;
            } catch (error) {
                console.error('Error fetching place details:', error);
            }
        }
    }

    useEffect(() => {
        if (region && mapRef.current) {
            const reg: Region = {
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };
            mapRef.current.animateToRegion(reg, 1000);
        }
    }, [region]);

    useEffect(() => {
        const requestPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.warn('Location permission denied');
                    setLoading(false);
                    return;
                }
            }

            Geolocation.getCurrentPosition(
                position => {
                    const {latitude, longitude} = position.coords;
                    setRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                    setLoading(false);
                    setTimeout(() => {
                        showActionSheet();
                    }, 300);
                },
                error => {
                    console.error('Error getting location', error);
                    setLoading(false);
                },
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
            );
        };

        requestPermission().then();
    }, []);

    if (loading || !region) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#f5684a"/>
            </View>
        );
    }

    return (
        <>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                showsUserLocation
                showsMyLocationButton
                showsPointsOfInterests={true}
                onPoiClick={handlePoiClick}
                onMapReady={() => {
                    if (region && mapRef.current) {
                        const reg: Region = {
                            latitude: region.latitude,
                            longitude: region.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        };
                        mapRef.current.animateToRegion(reg, 1000);
                    }
                }}
            >
                {/*<Marker coordinate={region} title="You are here" />*/}
            </MapView>

            <ActionSheetBase
                actionSheetRef={actionSheetRef}
                closeable={false}
                gesture={true}
                showBackgroundColor={true}
            >
                <View style={styles.content}>
                    <TextInput
                        label="Search"
                        value={text}
                        onChangeText={text => setText(text)}
                        mode="outlined"
                        outlineColor="#d0cfcf"
                        textColor="#d0cfcf"
                        outlineStyle={{
                            borderRadius: 10,
                        }}
                        left={
                            <TextInput.Icon
                                icon="magnify"
                                onPress={() => console.log('Icono presionado')}
                                color="#e74c3c"
                            />
                        }
                        theme={{
                            colors: {
                                placeholder: 'purple',
                            },
                        }}
                        style={[styles.input]}
                    />

                    <Button style={styles.button} onPress={() => {
                    }}>
                        <IconButton
                            icon="tune-variant"
                            iconColor="#fff"
                            size={18}
                            animated
                            contentStyle={{padding: 0}}
                        />
                    </Button>
                </View>

                <View
                    style={{
                        paddingHorizontal: 25,
                    }}
                >
                    {placeSelected !== null && (
                        <Card style={styles.card} mode="elevated">
                            <View style={styles.container}>
                                <Image
                                    source={{
                                        uri: showImagePlace,
                                    }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />

                                <View style={styles.infoContainer}>
                                    <Text style={styles.title}>{placeSelected.name}</Text>

                                    <View style={styles.ratingContainer}>
                                        <IconButton
                                            icon="star"
                                            iconColor="#F5D94AFF"
                                            size={18}
                                            animated
                                            contentStyle={{padding: 0}}
                                        />
                                        <Text style={styles.ratingText}>{placeDataSelected?.rating}</Text>
                                        <Text style={styles.reviewText}> • 120 Reviews</Text>
                                    </View>

                                    <View style={styles.bottomRow}>
                                        <Button
                                            compact
                                            style={styles.openButton}
                                            labelStyle={{color: 'white', fontSize: 12}}
                                        >
                                            Open
                                        </Button>

                                        <View style={styles.locationContainer}>
                                            <IconButton
                                                icon="map-marker"
                                                iconColor="#f5684a"
                                                size={18}
                                                animated
                                                contentStyle={{padding: 0}}
                                            />
                                            <Text style={styles.locationText}>USA</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    )}
                </View>

                <View style={{paddingBottom: 20}}/>
            </ActionSheetBase>
        </>
    );
};

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: 'white',
        flex: 1,
    },
    button: {
        marginTop: 6,
        backgroundColor: '#f5684a',
        borderRadius: 12,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    card: {
        borderRadius: 16,
        elevation: 2,
        margin: 10,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    image: {
        width: 80,
        borderRadius: 12,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-between',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    ratingText: {
        fontWeight: '600',
        color: '#333',
    },
    reviewText: {
        color: '#777',
        fontSize: 13,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    openButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'center',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    locationText: {
        marginLeft: 4,
        color: '#555',
    },
    map: {flex: 1},
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
