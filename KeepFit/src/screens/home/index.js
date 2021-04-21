import React, { useState } from 'react';
import { FlatList, SafeAreaView, View, StyleSheet, Text, Image } from 'react-native';
import Container from '@app/components/container.js';
import { Header, Subheader } from '@app/components/text.js';
import LoadingPic from '../../assets/loadingPic.png';


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
            <Container>
                <Text style={styles.mainHeader}>
                    Home
                </Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />
                <Image 
                    source={LoadingPic}
                    style={styles.image}
                />
                <Image 
                    source={LoadingPic}
                    style={styles.image}
                />
                <Image 
                    source={LoadingPic}
                    style={styles.image}
                />
                <Image 
                    source={LoadingPic}
                    style={styles.image}
                />
                <Image 
                    source={LoadingPic}
                    style={styles.image}
                />
                <Image 
                    source={LoadingPic}
                    style={styles.image}
                />
                <Image 
                    source={LoadingPic}
                    style={styles.image}
                />
            </Container>
            
            
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
        fontSize: 40,
        marginTop: "10%",
        color: "black",
        fontWeight: "bold"
    },
    subHeader: {
        fontSize: 18,
        marginTop: 0,
        textAlign: 'center',
    },
    image: {
        marginTop: "2%",
        width: 300,
        height: 100,
    }
});

export default HomeScreen;
