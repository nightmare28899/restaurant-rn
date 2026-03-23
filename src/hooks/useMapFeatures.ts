import { useState } from 'react';
import { Keyboard } from 'react-native';
import { GoogleMapsService } from '../services/GoogleMapsService';

interface Place {
    name: string;
    coordinate: { latitude: number; longitude: number };
    placeId: string;
}

export const useMapFeatures = (userLocation: { latitude: number; longitude: number } | null) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [placeDetails, setPlaceDetails] = useState<any>(null);
    const [markers, setMarkers] = useState<Place[]>([]);
    const [directionsCoordinates, setDirectionsCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
    const [showImagePlace, setShowImagePlace] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        Keyboard.dismiss();

        try {
            const results = await GoogleMapsService.searchPlaces(searchQuery);
            if (results.length > 0) {
                const place = results[0];
                const coordinate = {
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                };

                const newPlace = {
                    name: place.name,
                    placeId: place.place_id,
                    coordinate,
                };

                setSelectedPlace(newPlace);
                setMarkers(prev => [...prev, newPlace]);
                loadPlaceDetails(newPlace.placeId);
                return coordinate;
            }
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const loadPlaceDetails = async (placeId: string) => {
        try {
            const details = await GoogleMapsService.getPlaceDetails(placeId);
            setPlaceDetails(details);

            if (details.photos?.length > 0) {
                setShowImagePlace(GoogleMapsService.getPhotoUrl(details.photos[0].photo_reference));
            } else {
                setShowImagePlace(null);
            }
        } catch (error) {
            console.error('Details error:', error);
        }
    };

    const handleMapLongPress = async (e: any) => {
        const { coordinate } = e.nativeEvent;
        try {
            const results = await GoogleMapsService.reverseGeocode(coordinate.latitude, coordinate.longitude);
            let title = "Marked Location";
            let placeId = "";

            if (results.length > 0) {
                title = results[0].formatted_address;
                placeId = results[0].place_id;
            }

            const newPlace = { name: title, coordinate, placeId };
            setMarkers(prev => [...prev, newPlace]);
            setSelectedPlace(newPlace);
            if (placeId) loadPlaceDetails(placeId);

        } catch (error) {
            console.error('Reverse geocode error:', error);
            const newPlace = { name: "Marked Location", coordinate, placeId: "" };
            setMarkers(prev => [...prev, newPlace]);
        }
    };

    const fetchDirections = async (destination: { latitude: number; longitude: number }) => {
        if (!userLocation) return;
        try {
            const points = await GoogleMapsService.getDirections(userLocation, destination);
            setDirectionsCoordinates(points);
            return points;
        } catch (error) {
            console.error("Route error:", error);
        }
    };

    return {
        searchQuery,
        setSearchQuery,
        selectedPlace,
        setSelectedPlace,
        placeDetails,
        markers,
        directionsCoordinates,
        showImagePlace,
        handleSearch,
        handleMapLongPress,
        fetchDirections,
        loadPlaceDetails
    };
};
