import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Button, TextInput, IconButton} from 'react-native-paper';
import ActionSheetBase from "../../components/actionSheet/ActionSheetBase.tsx";
import {ActionSheetRef} from "react-native-actions-sheet";

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
            <ActionSheetBase
                actionSheetRef={actionSheetRef}
                closeable={false}
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
                        />
                    </Button>
                </View>
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
        marginBottom: 10,
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
});

export default HomeScreen;
