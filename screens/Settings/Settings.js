import React, {Component} from 'react';
import {Container, Header, Content, Tab, Tabs, Text} from 'native-base';

class Settings extends Component {
    render() {
        return (
            <Container>
                <Tabs>
                    <Tab heading="Tab1">
                        <Text>123</Text>
                    </Tab>
                    <Tab heading="Tab2">
                        <Text>123</Text>
                    </Tab>
                    <Tab heading="Tab3">
                        <Text>123</Text>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default Settings;
