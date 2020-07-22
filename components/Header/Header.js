import React from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
const MyHeader = (props) => {
    return (
        <View style={styles.container}>
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                </Header>
            </Container>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default MyHeader;
