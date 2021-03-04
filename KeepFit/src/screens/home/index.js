import React from 'react'
import { SafeAreaView } from 'react-native'

import Container from '@app/components/container.js'
import Text, { Header, Subheader } from '@app/components/text.js'

function Home() {
    return (
        <SafeAreaView>
            <Container>
                <Header style={{
                  fontSize: 50,
                  marginTop: "55%",
                  textAlign: "center"}} >
                  KeepFit</Header>
                <Subheader style={{
                  fontSize: 18,
                  marginTop: 0,
                  textAlign: "center"}}>
                  An exercise application</Subheader>
            </Container>
        </SafeAreaView>
    )
}

export default Home
