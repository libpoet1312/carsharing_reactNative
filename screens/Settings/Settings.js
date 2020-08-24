import React, {Component} from 'react';
import {Container, Header, Content, Tab, Tabs, Text} from 'native-base';


class Settings extends Component {
    render() {
        return (
            <Container>
                <Tabs>
                    <Tab heading="Basic Settings">
                        <Text>123</Text>
                    </Tab>
                    <Tab heading="Security Settings">
                        <Text>123</Text>
                    </Tab>

                </Tabs>
            </Container>
        );
    }
}

export default Settings;
