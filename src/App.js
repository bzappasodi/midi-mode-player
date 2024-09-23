import React from "react";
import './App.css';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Player from "./components/Player/Player";
import {MIDIProvider} from '@react-midi/hooks'
import {Container} from "@mui/material";

function App() {

    return (
        <MIDIProvider>
            <Container sx={{height: '100vh'}}>
                <Header/>
                <Player/>
                <Footer/>
            </Container>
        </MIDIProvider>
    );
}

export default App;
