import React from "react";
import './App.css';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Player from "./components/Player/Player";


function App() {

    return (

        <div className="flex-container">
            <Header/>
            <Player/>
            <Footer/>
        </div>

    );
}

export default App;
