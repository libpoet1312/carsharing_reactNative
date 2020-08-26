import React  from 'react'
import {View} from "react-native";
import { Container, Header, H2, Accordion,} from "native-base";

const dataArray = [
    { title: "What is this app?", content: "Lorem ipsum dolor sit amet" },
    { title: "FAQ", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

const FAQ = () => {
    return (
        <Container>
            <Header style={{backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
                <H2>Frequenty Asked Questions</H2>
            </Header>
            <View>
                <Accordion dataArray={dataArray} expanded={0}/>
            </View>



        </Container>
    );
};

export default FAQ;
