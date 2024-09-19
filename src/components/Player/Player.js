import React from "react";
import FormControl from '@mui/material/FormControl';
import ModePlayHooks from "../hooks/ModePlayHooks";
import Select from "../Select/Select";
import FormButton from "../FormButton/FormButton";


const Player = () => {
    const {
        status,
        STATUS,
        setStatus,
        selectedKey,
        setSelectedKey,
        selectedMode,
        setSelectedMode,
        buttonDisabled,
        setButtonDisabled,
    } = ModePlayHooks();


    const handleKeySelectChange = (e) => {
        setSelectedKey(e.target.value);
        setButtonDisabled(false)

    };

    const handleModeSelectChange = (e) => {
        setSelectedMode(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(STATUS.SUBMITTING);
        setButtonDisabled(true)
        console.log("Selected mode:", selectedMode);
        console.log("Selected key:", selectedKey);
    };

    console.log("status " + status)

    const keyChoices = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G"
    ]

    const modeChoices = [
        "Dorian",
        "Ionian",
        "Phrygian",
        "Lydian",
        "Mixolydian",
        "Aeolian",
        "Locrian"
    ]

    return (
        <form onSubmit={handleSubmit} noValidate>
            <FormControl>
                <Select
                    label="Select Mode"
                    name="selectedMode"
                    value={selectedMode}
                    options={modeChoices}
                    onChange={handleModeSelectChange}
                />
                <Select
                    label="Select Key"
                    name="selectedKey"
                    value={selectedKey}
                    options={keyChoices}
                    onChange={handleKeySelectChange}
                />
                <FormButton
                    isSubmitting={status === "SUBMITTING"}
                    disabled={buttonDisabled}
                    text="Play your mode!"
                />
            </FormControl>
        </form>
    );
}


export default Player;
