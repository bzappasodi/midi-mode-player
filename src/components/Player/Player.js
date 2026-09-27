import React, { useEffect, useRef, useState } from "react";
import FormControl from "@mui/material/FormControl";
import * as Tone from "tone";
import Select from "../Select/Select";
import FormButton from "../FormButton/FormButton";
import ModePlayHooks from "../hooks/ModePlayHooks";
import { getScaleNotes, midiToNoteName } from "../../utils/modes"; // adjust path if needed

const keyChoices = ["A", "B", "C", "D", "E", "F", "G"];
const modeChoices = [
    "Dorian",
    "Ionian",
    "Phrygian",
    "Lydian",
    "Mixolydian",
    "Aeolian",
    "Locrian",
];

const Player = () => {
    const synthRef = useRef(null);
    const [audioReady, setAudioReady] = useState(false);

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

    // Create a plucky / guitar-ish synth once
    useEffect(() => {
        // Tone.PluckSynth is a simple physical-model guitar-ish sound
        // Alternatives: Tone.Synth, Tone.PolySynth, or a Sampler with real samples
        synthRef.current = new Tone.PluckSynth({
            attackNoise: 1,
            dampening: 4000,
            resonance: 0.7,
        }).toDestination();

        return () => {
            if (synthRef.current) {
                synthRef.current.dispose();
            }
        };
    }, []);

    const bothSelected = selectedMode !== "" && selectedKey !== "";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bothSelected || !synthRef.current) return;

        // Browsers require a user gesture to start audio
        await Tone.start();
        setAudioReady(true);

        setStatus(STATUS.SUBMITTING);
        setButtonDisabled(true);

        const midiNotes = getScaleNotes(selectedKey, selectedMode);
        const noteNames = midiNotes.map(midiToNoteName);
        const duration = 0.5; // seconds per note
        const now = Tone.now();

        noteNames.forEach((note, i) => {
            synthRef.current.triggerAttackRelease(note, duration, now + i * duration);
        });

        // Re-enable button after the scale finishes
        const totalMs = noteNames.length * duration * 1000 + 150;
        setTimeout(() => {
            setStatus(STATUS.IDLE);
            setButtonDisabled(false);
        }, totalMs);
    };

    return (
        <div className="player-card">
            <form onSubmit={handleSubmit} noValidate>
                <div className="field">
                    <Select
                        label="Select Mode"
                        name="selectedMode"
                        defaultOptionText="Please select mode"
                        value={selectedMode}
                        options={modeChoices}
                        onChange={(e) => {
                            setSelectedMode(e.target.value);
                            setButtonDisabled(!(e.target.value && selectedKey));
                        }}
                    />
                </div>
                <div className="field">
                    <Select
                        label="Select Key"
                        name="selectedKey"
                        defaultOptionText="Please select key"
                        value={selectedKey}
                        options={keyChoices}
                        onChange={(e) => {
                            setSelectedKey(e.target.value);
                            setButtonDisabled(!(selectedMode && e.target.value));
                        }}
                    />
                </div>
                <div className="play-btn-wrap">
                    <FormButton
                        isSubmitting={status === STATUS.SUBMITTING}
                        disabled={!bothSelected || buttonDisabled}
                        text="Play your mode!"
                    />
                </div>
                {!audioReady && (
                    <p className="audio-hint">
                        Click Play to start audio (browser requirement).
                    </p>
                )}
            </form>
        </div>
    );
};

export default Player;