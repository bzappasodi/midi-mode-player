import React, {useState} from "react";
import FormControl from '@mui/material/FormControl';
import ModePlayHooks from "../hooks/ModePlayHooks";
import Select from "../Select/Select";
import FormButton from "../FormButton/FormButton";
import MidiComponent from "../MidiComponent/MidiComponent";
import MidiGenerator from "../MidiGenerator/MidiGenerator";

const keyChoices = ["A", "B", "C", "D", "E", "F", "G"];
const modeChoices = ["Dorian", "Ionian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];
const setShowMidiGenerator = "foobar"
const Player = () => {
    const [showMidiGenerator, setShowMidiGenerator] = useState(false);

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


    const handleSelectChange = (setters) => (e) => {

        const {value} = e.target;
        console.log("value ", value)
        // Update all the setters with the new value
        setters.forEach(setter => setter(value));

        // Enable the button if either selectedMode or selectedKey is not empty
        if (selectedMode || selectedKey) {
            setButtonDisabled(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(STATUS.SUBMITTING);
        // <MidiGenerator noteNumber={60}/>
        // <MidiComponent message={{'command': '144', 'note': '45', 'velocity':'50'}}/>
        setButtonDisabled(true);
        setSelectedMode('');
        setSelectedKey('');

    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <FormControl>
                <div>
                    <Select
                        label="Select Mode"
                        name="selectedMode"
                        defaultOptionText="Please select mode"
                        value={selectedMode}
                        options={modeChoices}
                        onChange={handleSelectChange([setSelectedMode])}
                    />
                </div>
                <div>
                    <Select
                        label="Select Key"
                        name="selectedKey"
                        defaultOptionText="Please select key"
                        value={selectedKey}
                        options={keyChoices}
                        onChange={handleSelectChange([setSelectedKey])}
                    />
                </div>
                <div>
                    <FormButton
                        isSubmitting={status === STATUS.SUBMITTING}
                        disabled={buttonDisabled}
                        text="Play your mode!"
                    />
                    {showMidiGenerator && <MidiGenerator noteNumber={64} />}

                </div>
            </FormControl>
            <MidiComponent/>
        </form>

);
}


export default Player;
