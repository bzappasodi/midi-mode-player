import React from "react";
import FormControl from '@mui/material/FormControl';
import ModePlayHooks from "../hooks/ModePlayHooks";
import Select from "../Select/Select";
import FormButton from "../FormButton/FormButton";

const keyChoices = ["A", "B", "C", "D", "E", "F", "G"];
const modeChoices = ["Dorian", "Ionian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];

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


    const handleSelectChange = () => (e) => {
        e.target.name === 'selectedKey' && setButtonDisabled(false);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(STATUS.SUBMITTING);
        setButtonDisabled(true);

    };


    return (
        <form onSubmit={handleSubmit} noValidate>
            <FormControl>
                <Select
                    label="Select Mode"
                    name="selectedMode"
                    value={selectedMode}
                    options={modeChoices}
                    onChange={handleSelectChange([setSelectedMode])}
                />
                <Select
                    label="Select Key"
                    name="selectedKey"
                    value={selectedKey}
                    options={keyChoices}
                    onChange={handleSelectChange([setSelectedKey])}
                />
                <FormButton
                    isSubmitting={status === STATUS.SUBMITTING}
                    disabled={buttonDisabled}
                    text="Play your mode!"
                />
            </FormControl>
        </form>
    );
}

export default Player;
