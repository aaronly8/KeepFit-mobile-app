import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Container from '@app/components/container.js';
import { Header, Subheader, Text } from '@app/components/text.js';

const HomeScreen = (props) => {
    const [posts, setPosts] = useState([]);

    const renderItem = ({ item }) => {
        <Container>
            <View>
                <Text>User Name completed XYZ</Text>
            </View>
            <View></View>
        </Container>;
    };

    return (
        <SafeAreaView>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 50,
        marginTop: '55%',
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 18,
        marginTop: 0,
        textAlign: 'center',
    },
});

export default HomeScreen;
