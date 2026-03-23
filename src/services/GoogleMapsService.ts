import { decodePolyline } from '../utils/mapUtils';

const API_KEY = 'YOUR_API_KEY_HERE'; // In a real app, use Config or env variables

export const GoogleMapsService = {
    async searchPlaces(query: string) {
        if (!query.trim()) return [];
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    },

    async getPlaceDetails(placeId: string) {
        if (!placeId) return null;
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,photos,rating,geometry&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.result;
    },

    async getDirections(origin: { latitude: number; longitude: number }, destination: { latitude: number; longitude: number }) {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
            return decodePolyline(data.routes[0].overview_polyline.points);
        }
        return [];
    },

    async reverseGeocode(latitude: number, longitude: number) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    },

    getPhotoUrl(photoReference: string) {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${API_KEY}`;
    }
};
