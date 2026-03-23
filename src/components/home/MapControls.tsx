import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

interface MapControlsProps {
    isTracking: boolean;
    onToggleTracking: () => void;
    onFocusLocation: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
}

export const MapControls = ({
    isTracking,
    onToggleTracking,
    onFocusLocation,
    onZoomIn,
    onZoomOut
}: MapControlsProps) => {
    return (
        <View style={styles.fabContainer}>
            <FAB
                icon={isTracking ? "stop" : "map-marker-path"}
                label={isTracking ? "Stop Tracking" : "Start Tracking"}
                style={styles.fab}
                onPress={onToggleTracking}
                color="white"
            />
            <View style={styles.zoomContainer}>
                <FAB
                    icon="crosshairs-gps"
                    style={styles.zoomFab}
                    onPress={onFocusLocation}
                    color="#f5684a"
                />
                <FAB
                    icon="plus"
                    style={styles.zoomFab}
                    onPress={onZoomIn}
                    color="#f5684a"
                />
                <FAB
                    icon="minus"
                    style={styles.zoomFab}
                    onPress={onZoomOut}
                    color="#f5684a"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        top: 60,
        right: 10,
        alignItems: 'flex-end',
    },
    zoomContainer: {
        marginTop: 20,
        gap: 10,
    },
    zoomFab: {
        backgroundColor: 'white',
    },
    fab: {
        backgroundColor: '#f5684a',
    },
});
