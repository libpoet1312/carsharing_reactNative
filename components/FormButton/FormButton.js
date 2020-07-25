import React from 'react';
import { StyleSheet, Dimensions, Button,Text} from 'react-native';

const { width, height } = Dimensions.get('screen');

export default function FormButton({ title, ...rest }) {
    return (
        <Button
            title={title}
            {...rest}
            style={styles.button}
        >
            <Text>{title}</Text>
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10
    },
    buttonContainer: {
        width: width / 2,
        height: height / 15
    }
});
