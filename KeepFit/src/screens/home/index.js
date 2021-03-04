import React from 'react'
import { SafeAreaView } from 'react-native'

import Container from '@app/components/container.js'
import Text, { Header } from '@app/components/text.js'

function Home() {
    return (
        <SafeAreaView>
            <Container>
                <Header>Hello world!</Header>
            </Container>
        </SafeAreaView>
    )
}

export default Home
