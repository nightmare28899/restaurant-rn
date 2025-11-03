import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Platform, Image} from 'react-native';
import {Button, TextInput, IconButton, Card, Text} from 'react-native-paper';
import ActionSheetBase from "../../components/actionSheet/ActionSheetBase.tsx";
import {ActionSheetRef} from "react-native-actions-sheet";
import {MapView} from "@maplibre/maplibre-react-native";

const HomeScreen = () => {
    const [text, setText] = useState<string>('');
    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        if (Platform.OS === "ios") {
            setTimeout(() => {
                showActionSheet();
            }, 300);
        } else {
            showActionSheet();
        }
    }, []);

    const showActionSheet = () => {
        if (actionSheetRef.current) {
            actionSheetRef.current.show();
            //setActionSheetRef(actionSheetRef.current);
        }
    };

    {/*<Button onPress={() => actionSheetRef.current?.hide()}>*/
    }
    {/*    opcion 1*/
    }
    {/*</Button>*/
    }

    return (
        <>
            <View style={{flex: 1}}>
                <MapView
                    style={{flex: 1, zIndex: -1}}
                    // styleURL="https://maps.tilehosting.com/styles/bright-v11/style.json?key=<KEY>"
                    logoEnabled={false}
                    zoomEnabled={true}
                    scrollEnabled={true}
                    rotateEnabled={true}
                    pitchEnabled={true}
                    attributionEnabled={false}
                    compassEnabled={true}
                />

                <ActionSheetBase
                    actionSheetRef={actionSheetRef}
                    closeable={true}
                    gesture={true}
                    showBackgroundColor={false}
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

                        <Button
                            style={styles.button}
                            onPress={() => {
                            }}
                        >
                            <IconButton
                                icon="tune-variant"
                                iconColor="#fff"
                                size={18}
                                animated
                                contentStyle={{padding: 0}}
                            />
                        </Button>
                    </View>

                    <View style={{
                        paddingHorizontal: 25,
                    }}>
                        <Card style={styles.card} mode="elevated">
                            <View style={styles.container}>

                                <Image
                                    source={{uri: 'https://fastly.picsum.photos/id/471/200/200.jpg?hmac=LEJyaxVwJ-Df2QN6POR3mvD0nKLbC6GIntpAUjTR3gM'}}
                                    style={styles.image}
                                    resizeMode="cover"
                                />

                                <View style={styles.infoContainer}>
                                    <Text style={styles.title}>Flo's V8 Cafe</Text>

                                    <View style={styles.ratingContainer}>
                                        <IconButton
                                            icon="star"
                                            iconColor="#F5D94AFF"
                                            size={18}
                                            animated
                                            contentStyle={{padding: 0}}
                                        />
                                        <Text style={styles.ratingText}>4.6</Text>
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
                    </View>

                    <View style={{paddingBottom: 20}}/>

                </ActionSheetBase>
            </View>
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
});

export default HomeScreen;
