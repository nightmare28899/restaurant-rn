import { View, StyleSheet } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onSubmit: () => void;
}

export const SearchBar = ({ value, onChangeText, onSubmit }: SearchBarProps) => {
    return (
        <View style={styles.content}>
            <TextInput
                label="Search"
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
                mode="outlined"
                outlineColor="#d0cfcf"
                textColor="#d0cfcf"
                outlineStyle={styles.outline}
                left={
                    <TextInput.Icon
                        icon="magnify"
                        onPress={onSubmit}
                        color="#e74c3c"
                    />
                }
                theme={{ colors: { placeholder: 'purple' } }}
                style={styles.input}
            />

            <Button style={styles.button} onPress={() => { }}>
                <IconButton
                    icon="tune-variant"
                    iconColor="#fff"
                    size={15}
                    animated
                    contentStyle={{ padding: 0 }}
                />
            </Button>
        </View>
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
    input: {
        backgroundColor: 'white',
        flex: 1,
    },
    outline: {
        borderRadius: 10,
    },
    button: {
        marginTop: 6,
        backgroundColor: '#f5684a',
        borderRadius: 12,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
