import { useRef, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { ActionSheetRef } from 'react-native-actions-sheet';
import ActionSheetBase from '../components/actionSheet/ActionSheetBase.tsx';

import { useLocation } from '../hooks/useLocation';
import { useMapFeatures } from '../hooks/useMapFeatures';
import { SearchBar } from '../components/home/SearchBar.tsx';
import { MapControls } from '../components/home/MapControls.tsx';
import { PlaceDetailsSheet } from '../components/home/PlaceDetailsSheet.tsx';

const HomeScreen = () => {
    const mapRef = useRef<MapView>(null);
    const actionSheetRef = useRef<ActionSheetRef>(null);

    const { userLocation, routeCoordinates, isTracking, loading, toggleTracking, getCurrentLocation } = useLocation();
    const {
        searchQuery,
        setSearchQuery,
        selectedPlace,
        placeDetails,
        markers,
        directionsCoordinates,
        showImagePlace,
        handleSearch,
        handleMapLongPress,
        fetchDirections
    } = useMapFeatures(userLocation);

    // Initial focus on user location
    useEffect(() => {
        if (!loading && userLocation && mapRef.current) {
            mapRef.current.animateToRegion({
                ...userLocation,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 1000);
        }
    }, [loading, userLocation]);

    // Show ActionSheet when a place is selected
    useEffect(() => {
        if (selectedPlace) {
            actionSheetRef.current?.show();
            // Move map to selected place
            mapRef.current?.animateToRegion({
                ...selectedPlace.coordinate,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 1000);
        }
    }, [selectedPlace]);

    // Fit map to route when directions are found
    useEffect(() => {
        if (directionsCoordinates.length > 0 && mapRef.current) {
            mapRef.current.fitToCoordinates(directionsCoordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    }, [directionsCoordinates]);

    const handleFocusLocation = () => {
        getCurrentLocation();
        if (userLocation && mapRef.current) {
            mapRef.current.animateToRegion({
                ...userLocation,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 1000);
        }
    };

    const handleZoom = (zoomIn: boolean) => {
        if (mapRef.current) {
            mapRef.current.getCamera().then(camera => {
                if (camera) {
                    camera.zoom = (camera.zoom || 15) + (zoomIn ? 1 : -1);
                    mapRef.current?.animateCamera(camera, { duration: 300 });
                }
            });
        }
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#f5684a" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation
                showsMyLocationButton={false} // Custom button used
                onLongPress={handleMapLongPress}
                initialRegion={userLocation ? {
                    ...userLocation,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                } : undefined}
            >
                {markers.map((m, index) => (
                    <Marker
                        key={index + 'mark'}
                        coordinate={m.coordinate}
                        title={m.name}
                    />
                ))}

                <Polyline
                    coordinates={routeCoordinates}
                    strokeColor="#f5684a"
                    strokeWidth={6}
                />
                <Polyline
                    coordinates={directionsCoordinates}
                    strokeColor="#4285F4"
                    strokeWidth={4}
                />
            </MapView>

            <View style={styles.searchContainer}>
                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmit={handleSearch}
                />
            </View>

            <MapControls
                isTracking={isTracking}
                onToggleTracking={toggleTracking}
                onFocusLocation={handleFocusLocation}
                onZoomIn={() => handleZoom(true)}
                onZoomOut={() => handleZoom(false)}
            />

            <ActionSheetBase
                actionSheetRef={actionSheetRef}
                closeable={true}
                gesture={true}
                showBackgroundColor={true}
                containerStyle={{ maxHeight: '70%' }}
                snapPoints={[35, 80]}
            >
                <PlaceDetailsSheet
                    place={selectedPlace}
                    details={placeDetails}
                    photoUrl={showImagePlace}
                    onRoutePress={() => {
                        if (selectedPlace) {
                            fetchDirections(selectedPlace.coordinate);
                            actionSheetRef.current?.hide();
                        }
                    }}
                />
            </ActionSheetBase>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    }
});

export default HomeScreen;
