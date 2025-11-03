import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Platform, Image, Alert} from 'react-native';
import {Button, TextInput, IconButton, Card, Text} from 'react-native-paper';
import ActionSheetBase from "../../components/actionSheet/ActionSheetBase.tsx";
import {ActionSheetRef} from "react-native-actions-sheet";

import {WebView} from "react-native-webview";

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
    const markers = [
        {id: 1, name: "Ciudad de México", lat: 19.4326, lng: -99.1332},
        {id: 2, name: "Guadalajara", lat: 20.6597, lng: -103.3496},
        {id: 3, name: "Monterrey", lat: 25.6866, lng: -100.3161},
    ];

    const leafletHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mapa Leaflet</title>

        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

        <style>
          html, body, #map { height: 100%; margin: 0; padding: 0; }
          .leaflet-popup-content { font-size: 14px; }
        </style>
      </head>
      <body>
        <div id="map"></div>

        <script>
          const map = L.map('map').setView([23.6345, -102.5528], 5);

          // Cargar tiles de OpenStreetMap
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);

          // Obtener marcadores desde React Native
          const markers = ${JSON.stringify(markers)};

          // Renderizar marcadores
          markers.forEach((m) => {
            const marker = L.marker([m.lat, m.lng]).addTo(map);
            marker.bindPopup("<b>" + m.name + "</b>");
            marker.on("click", function() {
              // Enviar datos a React Native
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "marker_click",
                id: m.id,
                name: m.name,
                lat: m.lat,
                lng: m.lng
              }));
            });
          });
        </script>
      </body>
    </html>
  `;
    const handleMessage = (event:any) => {
        const data = JSON.parse(event.nativeEvent.data);
        if (data.type === "marker_click") {
            Alert.alert("Marcador tocado", `${data.name}\n(${data.lat}, ${data.lng})`);
        }
    };

    return (
        <>
            <View style={{flex: 1}}>

                <WebView
                    originWhitelist={["*"]}
                    source={{ html: leafletHTML }}
                    onMessage={handleMessage}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    style={styles.map}
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
    map: { flex: 1 },
});

export default HomeScreen;
