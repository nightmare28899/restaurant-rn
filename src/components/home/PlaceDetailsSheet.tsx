import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Button, IconButton, Card, Text } from 'react-native-paper';

interface PlaceDetailsSheetProps {
    place: { name: string; coordinate: any } | null;
    details: any;
    photoUrl: string | null;
    onRoutePress: () => void;
}

export const PlaceDetailsSheet = ({ place, details, photoUrl, onRoutePress }: PlaceDetailsSheetProps) => {
    if (!place) return null;

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.wrapper}>
                <Card style={styles.card} mode="elevated">
                    <View style={styles.container}>
                        {photoUrl && (
                            <Image
                                source={{ uri: photoUrl }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        )}

                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>{place.name}</Text>

                            <View style={styles.ratingContainer}>
                                <IconButton
                                    icon="star"
                                    iconColor="#F5D94AFF"
                                    size={18}
                                    animated
                                    contentStyle={{ padding: 0 }}
                                />
                                <Text style={styles.ratingText}>{details?.rating || 'N/A'}</Text>
                                <Text style={styles.reviewText}> • {details?.user_ratings_total || 0} Reviews</Text>
                            </View>

                            <View style={styles.bottomRow}>
                                <Button
                                    compact
                                    style={styles.openButton}
                                    labelStyle={{ color: 'white', fontSize: 12 }}
                                >
                                    Open
                                </Button>

                                <Button
                                    compact
                                    style={[styles.openButton, { backgroundColor: '#4285F4', marginLeft: 10 }]}
                                    labelStyle={{ color: 'white', fontSize: 12 }}
                                    onPress={onRoutePress}
                                >
                                    Route
                                </Button>

                                <View style={styles.locationContainer}>
                                    <IconButton
                                        icon="map-marker"
                                        iconColor="#f5684a"
                                        size={18}
                                        animated
                                        contentStyle={{ padding: 0 }}
                                    />
                                    <Text style={styles.locationText}>USA</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        width: '100%',
        flexShrink: 1,
        height: '100%',
    },
    wrapper: {
        paddingHorizontal: 10,
        width: '100%',
        height: '60%'
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
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
