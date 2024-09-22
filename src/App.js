import React from "react";
import './App.css';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Player from "./components/Player/Player";
import { MIDIProvider } from '@react-midi/hooks'

function App() {

    return (
        <MIDIProvider>

        <Header/>
            <Player/>
            <Footer/>
        </MIDIProvider>
    );
}

export default App;
