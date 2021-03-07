import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Container from '@app/components/container.js'
import { Header } from '@app/components/text.js';

const HomeScreen = props => {
    return (
        <SafeAreaView>
            <Container>
                <Header style={styles.mainHeader}>
                    Welcome to the Home Screen!
                </Header>
            </Container>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 50,
        marginTop: "55%",
        textAlign: "center"
    }
});

export default HomeScreen;
