import { useState, useRef, useEffect, useCallback } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

interface Coordinates {
    latitude: number;
    longitude: number;
}

export const useLocation = () => {
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
    const [routeCoordinates, setRouteCoordinates] = useState<Coordinates[]>([]);
    const [isTracking, setIsTracking] = useState(false);
    const [loading, setLoading] = useState(true);
    const watchId = useRef<number | null>(null);

    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const getCurrentLocation = useCallback(async () => {
        const hasPermission = await requestPermission();
        if (!hasPermission) {
            setLoading(false);
            return;
        }

        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
                setLoading(false);
            },
            error => {
                console.error('Error getting location', error);
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    const startTracking = async () => {
        const hasPermission = await requestPermission();
        if (!hasPermission) return;

        setIsTracking(true);
        setRouteCoordinates([]);

        watchId.current = Geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const newCoordinate = { latitude, longitude };
                setUserLocation(newCoordinate);
                setRouteCoordinates(prev => [...prev, newCoordinate]);
            },
            error => console.error('WatchPosition Error:', error),
            {
                enableHighAccuracy: true,
                distanceFilter: 10,
                interval: 5000,
                fastestInterval: 2000,
                timeout: 20000
            }
        );
    };

    const stopTracking = () => {
        if (watchId.current !== null) {
            Geolocation.clearWatch(watchId.current);
            watchId.current = null;
        }
        setIsTracking(false);
    };

    const toggleTracking = () => {
        if (isTracking) stopTracking();
        else startTracking();
    };

    useEffect(() => {
        getCurrentLocation();
        return () => stopTracking();
    }, [getCurrentLocation]);

    return {
        userLocation,
        routeCoordinates,
        isTracking,
        loading,
        toggleTracking,
        getCurrentLocation,
    };
};
